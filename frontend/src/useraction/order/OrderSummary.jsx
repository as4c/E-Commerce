import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../homepage/Layout';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { loadProductData } from '../../features/actions/productActions';
import { BaseUrl } from '../../backend';
import { loadAddress } from '../../features/actions/addressAction';
import { createOrder } from '../../features/actions/orderActions';
import { unwrapResult } from '@reduxjs/toolkit';
import { CompletePayment, InitiatePayment } from '../../features/actions/paymentAction';
import useRazorpay from "react-razorpay";
import Swal from 'sweetalert2';
import { Watch } from 'react-loader-spinner'

const OrderSummary = () => {

    const [Razorpay] = useRazorpay();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [add, setAdd] = useState(0);
    const [remove, setRemove] = useState(0);
    const [addressdata, setAddress] = useState("");
    const [payment, setPayment] = useState("");

    let [quantity, setQuantity] = useState(1);
    const { pathname } = useLocation();
    const { uid } = useParams();

    const { isAuthenticated, redirect, user } = useSelector((state) => state.auth);
    const { address } = useSelector((state) => state.address);
    useEffect(() => {
        document.title = 'Order summary';
    }, []);
    useEffect(() => {
        if (isAuthenticated) {
            dispatch(loadProductData({ uid }));
        } else {
            navigate('/signin')
            dispatch(redirect({ pathname }))
        }
    }, [uid]);

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

    const removeItem = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        } else {
            quantity = 1;
        }
        setRemove(remove - 1);
    }


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
        setPayment(selectedPayment);
    }

    const AddItem = () => {
        setQuantity(quantity + 1)
        setAdd(add + 1);
    }
    const CalculateSubTotal = () => {
        return quantity * product['effective_price'];
    };

    if (product.length === 0 || loading) {
        return (
            <div className='min-h-screen'>
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

    const onSubmit = async () => {
        if (payment_loading) {
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
        if (addressdata === "") {
            alert("Choose your delivery address.")
        }
        if (payment === "") {
            alert("Select Payment Mode.")
        }
        console.log("submit clicked!")
        const res1 = await dispatch(createOrder({
            product: product,
            address: addressdata,
            quantity: quantity,
            payment_mode: payment
        }));
        const res = await unwrapResult(res1);
        // console.log("order res..", res);
        if (!res.errors) {
            if (payment === 'ONL') {

                const amount = res.data.total_effective_amount;

                const order = res.data.uid

                const payment_res = await dispatch(InitiatePayment({ order: order, amount: amount }));
                const response = await unwrapResult(payment_res);
                // console.log("response1...", response);
                if (response.success) {
                    var order_id = response.data.razorpay_order_id

                    const options = {
                        key: process.env.REACT_APP_RAZORPAY_PUBLIC_KEY,
                        name: "Bewra.com Pvt.Ltd",
                        description: "Test Transaction",
                        image: "https://example.com/your_logo",
                        order_id: order_id,
                        handler: function async(response) {
                            dispatch(CompletePayment({
                                order: order,
                                paymentID: response.razorpay_payment_id,
                                orderID: response.razorpay_order_id,
                                signature: response.razorpay_signature,
                                amount: amount
                            }))
                            // console.log("complete response...", response);
                            Swal.fire({
                                icon: 'success',
                                title: 'Order Placed Successfully.',
                                text: res.message,
                            });
                            setAddress("");
                            setPayment("");
                            setQuantity(1);
                            navigate(`/user/orders/${order}`);
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
                    // console.log("rzp1..", rzp1);
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
                setAddress("");
                setPayment("");
                setQuantity(1);
                navigate(`/user/orders/${res.data.uid}`)
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

    const mapAddressCodeToLabel = (code) => {
        switch (code) {
            case 'C':
                return 'Current';
            case 'H':
                return 'Home';
            case 'O':
                return 'Other';
            default:
                return 'Unknown';
        }
    };


    return (
        <Layout>

            <body>
                <title>Order Summary</title>
            </body>
            <div className="bg-white my-10 flex flex-col justify-between" id='product-detail'>

                <div className="pb-3 mb-5">
                    <h1 className="text-center align-center text-3xl font-bold text-gray-800">Order Summary</h1>
                </div>
                <hr />
                <div>
                    <div className='border-b'>
                        <div className="grid grid-cols-2">
                            <div className='flex flex-col justify-between'>
                                <div className="flex flex-row mx-auto">
                                    <img className='w-40 h-auto block mb-3' src={`${BaseUrl}/${product?.image}`} alt='product' />
                                    <div className="start inline">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="text-sm text-slate-800 inline">4.9</span>
                                    </div>
                                </div>
                                <div className="flex flex-row mx-auto mb-2">
                                    <div className='border-r-3'>
                                        <div className='px-5 py-2 bg-gray-200'>
                                            <button onClick={() => removeItem()} className='text-xl'> - </button>
                                        </div>
                                    </div>
                                    <div className='border-r-3 border-gray-500'>
                                        <div className='px-5 py-2 bg-gray-200'>
                                            <h1 className='text-lg'> Q : {quantity}</h1>
                                        </div>
                                    </div>
                                    <div className=''>
                                        <div className='px-5 py-2 bg-gray-200'>
                                            <button onClick={() => AddItem()} className='text-xl'>
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div className='flex justify-between'>
                                <div className='text-indigo-500 mx-5 md:mt-3 pt-4'>
                                    <h3 className="uppercase text-black text-2xl font-medium">{product?.product_name}
                                    </h3>
                                    <small className='mb-7'>Brand : {product.brand_name}</small>
                                    <p>category : {product?.category}</p>
                                    <div className='flex justify-between'>
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className="start">

                                            <del className="text-xl font-semibold mb-1 text-red-700 line-through">M.R.P {product.actual_price}</del>
                                            <h3 className="text-2xl font-semibold mb-1">Rs. {product.effective_price}</h3>
                                            <p className="font-semibold text-base text-gray-70">{product.discount} % OFF</p>
                                            <p className='text-gray-500 '>Vol. {product.volume} ML</p>

                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className='my-3 flex flex-col justify-center items-center mx-auto '>
                <div className="pb-3 mb-2">
                    <h1 className="text-center align-center text-xl font-bold text-gray-800">Select Address</h1>
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
                            <div>
                            <Link to={`/user/create-address`} className='bg-blue-500 hover:bg-blue-600 py-2 px-3 m-1 rounded-lg font-semibold'> + Add Address</Link>
                            </div>
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
                            value={payment}
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
            <hr />
            <div className='flex flex-row justify-end'>
                <h2 className='text-orange-600'> </h2>
                <div className='flex items-center space-x-1.5 rounded-2xl px-5 mr-5 font-semibold'>
                    Total: Rs. {CalculateSubTotal()}.00
                </div>
                <div className="flex items-end justify-center p-3 mt-2">
                    <div className="flex items-center space-x-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 px-5 py-2 text-white duration-100">
                        <button onClick={onSubmit} className="text-lg font-bold">Order Now</button>
                    </div>
                </div>
            </div>

        </Layout >

    );
};

export default OrderSummary;