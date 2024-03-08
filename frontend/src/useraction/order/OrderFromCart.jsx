
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../homepage/Layout';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { loadProductData } from '../../features/actions/productActions';
import { BaseUrl } from '../../backend';
import { loadAddress } from '../../features/actions/addressAction';
import { buyAll } from '../../features/actions/orderActions';
import { unwrapResult } from '@reduxjs/toolkit';
import { CompletePaymentForAll, InitiatePaymentForAll } from '../../features/actions/paymentAction';
import useRazorpay from "react-razorpay";
import Swal from 'sweetalert2';
import { Watch } from 'react-loader-spinner'
import { mapAddressCodeToLabel } from '../../helper';


const OrderFromCart = () => {
    const [Razorpay] = useRazorpay();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [add, setAdd] = useState(0);
    const [remove, setRemove] = useState(0);
    const [addressdata, setAddress] = useState("");
    const [paymentMode, setPaymentMode] = useState("");

    const { pathname } = useLocation();
    const { uid } = useParams();

    const { isAuthenticated, redirect, user } = useSelector((state) => state.auth);
    const { address } = useSelector((state) => state.address);

    useEffect(() => {
        document.title = 'Order from cart';
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            if (isAuthenticated) {
                dispatch(loadAddress());
            } else {
                return navigate('/signin');
            }
        };

        fetchData();
    }, [isAuthenticated, dispatch]);


    const { product, loading } = useSelector((state) => state.product);
    const { payment_loading, payments, error } = useSelector((state) => state.payment);

    const [checked, setChecked] = useState(false);

    const onSelectAddress = (uid) => {
        setChecked((prevChecked) => {
            if (!prevChecked) {
                setAddress(uid);
            } else {
                setAddress("");
            }
            return !prevChecked;
        });
    };
    const handleSetPayment = (event) => {
        const selectedPayment = event.target.value;
        setPaymentMode(selectedPayment);
    }

    const onSubmit = async () => {
        if (addressdata === "") {
            alert("Choose your delivery address.")
        }
        if (paymentMode === "") {
            alert("Select Payment Mode.")
        }
        console.log("submit clicked!")
        console.log("address...", addressdata);
        console.log("payment mode... ", paymentMode);
        const res1 = await dispatch(buyAll({
            address: addressdata,
            payment_mode: paymentMode
        }));
        const res = await unwrapResult(res1);
        console.log("order res..", res);
        if (!res.errors) {
            if (paymentMode === 'ONL') {

                const amount = res.total_amount;

                const orders = res.orders

                const payment_res = await dispatch(InitiatePaymentForAll({ orders: orders, amount: amount }));
                const response = await unwrapResult(payment_res);
                console.log("response1...", response);
                if (response.success) {
                    var order_id = response.data.razorpay_order_id

                    const options = {
                        key: process.env.REACT_APP_RAZORPAY_PUBLIC_KEY,
                        name: "Bewra.com Pvt.Ltd",
                        description: "Test Transaction",
                        image: "https://example.com/your_logo",
                        order_id: order_id,
                        handler: function async(response) {
                            dispatch(CompletePaymentForAll({
                                orders: orders,
                                paymentID: response.razorpay_payment_id,
                                orderID: response.razorpay_order_id,
                                signature: response.razorpay_signature,
                                amount: amount
                            }))
                            console.log("complete response...", response);
                            Swal.fire({
                                icon: 'success',
                                title: 'Orders Placed Successfully.',
                                text: res.message,
                            });

                            navigate(`/user/orders`);
                        },
                        prefill: {
                            name: user.first_name + " " + user.last_name,
                            email: user.email,
                            contact: user.phone,
                        },
                        notes: {
                            address: "B P Mandal Colllege of engineering, Madhepura",
                        },
                        theme: {
                            color: "#3399cc",
                        },
                    };

                    const rzp1 = new Razorpay(options);
                    rzp1.on("payment.failed", function (response) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Payment Failed!',
                            text: response.error.description,
                        });

                    });
                    rzp1.open();
                }

            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Order Placed Successfully.',
                    text: res.message,
                });

                navigate(`/user/orders`)
            }
        }
        else {
            const errorFields = Object.keys(res.errors);
            const errorMessage = errorFields.map(field => `${field}: ${res.errors[field][0]}`).join('\n');
            Swal.fire({
                icon: 'error',
                title: 'Order Failed.',
                text: errorMessage,
            });

        }

    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Watch
                    visible={true}
                    height="80"
                    width="80"
                    radius="48"
                    color="#4fa94d"
                    ariaLabel="watch-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        )
    }
    return (
        <div>
            <div className='my-3 flex flex-col justify-center items-center mx-auto '>
                <div className="pb-3 mb-2">
                    <h1 className="text-center align-center text-xl font-bold text-gray-800">Choose Your Current Address</h1>
                </div>
                <div className="p-3 shadow-sm rounded-sm mx-auto flex flex-col justify-center" id='address'>
                    <div className={address.length === 1 ? "grid grid-cols-1" : "grid grid-cols-2"}>
                        {address.length > 0 ? (
                            address.map((address) => (
                                <div key={address.uid} className='bg-gray-100 m-1 h-100 w-auto'>
                                    <ul className="list-inside space-y-2  ">
                                        <div className="flex flex-row justify-between px-4 py-2 text-gray-800">
                                            <button className='mr-5 block font-semibold text-center'>{mapAddressCodeToLabel(address.type)} Address</button>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold text-gray-400">Street / House No. / Building name</div>
                                            <div className="px-4 py-2">{address.address1}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold text-gray-400">Landmark</div>
                                            <div className="px-4 py-2">{address.landmark}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold text-gray-400">City</div>
                                            <div className="px-4 py-2">{address.city}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold text-gray-400">State </div>
                                            <div className="px-4 py-2">{address.state}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold text-gray-400">
                                                Zipcode
                                            </div>
                                            <div className="px-4 py-2">{address.zipcode}</div>
                                        </div>

                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold text-gray-400">Country </div>
                                            <div className="px-4 py-2">{address.country}</div>
                                        </div>
                                    </ul>
                                    <div className="py-2 text-gray-800 flex justify-end">
                                        <Link to={`/user/update-address/${address.uid}`} className='mx-5 bg-green-500 hover:bg-green-600 py-1.5 px-4 font-semibold text-gray-200 rounded-lg'>Edit</Link>


                                        <label className="ml-5 bg-orange-500 hover:bg-orange-600 py-1.5 px-2.5 font-semibold text-gray-200 rounded-lg cursor-pointer">
                                            <input type="checkbox" checked={checked} onChange={() => { }} onClick={() => onSelectAddress(address.uid)} /> Deliver to this address
                                        </label>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <Link to={`/user/create-address`} className='bg-blue-500 hover:bg-blue-600 py-2 px-3 m-1 rounded-lg font-semibold'> + Add Address</Link>
                        )}
                    </div>
                    {address.length > 0 ? (
                        <div className='mt-1 relative text-end'>
                            <Link to={`/user/create-address`} className='bg-blue-500 hover:bg-blue-600 py-2 px-3 m-1 rounded-lg font-semibold'>
                                + Add Another Address
                            </Link>
                        </div>
                    ) :
                        ""
                    }
                </div>

            </div>
            <div className='container my-10 flex flex-col justify-center items-center'>
                <div className="pb-3 mb-5">
                    <h1 className="text-center align-center text-xl font-bold text-gray-800">Select Payment Mode</h1>
                </div>
                <div className="p-3 shadow-sm rounded-sm">
                    <div className="mb-4 ">

                        <select
                            name="payment"
                            value={paymentMode}
                            onChange={handleSetPayment}
                            className="w-full text-gray-500 px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="" className='text-gray-400'> Payment Mode... </option>
                            <option value="ONL">Online</option>
                            <option value="COD">Cash on delivery</option>

                        </select>
                    </div>
                </div>
            </div>

            <div className="flex items-end justify-center p-3 mt-2">
                <div className="flex items-center space-x-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 px-5 py-2 text-white duration-100">
                    <button onClick={onSubmit} className="text-lg font-bold">Order Now</button>
                </div>
            </div>
        </div>
    )
}

export default OrderFromCart;