import React, { useEffect } from 'react'
import Layout from '../../homepage/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { BaseUrl } from '../../backend'
import { useParams } from 'react-router-dom'
import { cancelOrReturnOrder, loadOrderData } from '../../features/actions/orderActions'
import { Watch } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import {
    mapAddressCodeToLabel,
    mapGenderCodeToLabel,
    mapOrderStatusToLabel,
    mapPaymentCodeToLabel,
    mapPaymentStatusToLabel
} from '../../helper'
import Loading from '../../helper/Loading'
const OrderDetail = () => {
    const { order_loading, orderdata } = useSelector((state) => state.order);
    const dispatch = useDispatch();
    const { uid } = useParams();
    useEffect(() => {
        document.title = 'Order detail';
    }, []);
    useEffect(() => {
        dispatch(loadOrderData({ uid }))
    }, [dispatch, uid]);

    const product = orderdata.product;
    const address = orderdata.address;
    const order = orderdata.order;
    const deliveryBoy = orderdata.delivery_boy


    const handleCancelOrReturn = (value) => {
        dispatch(cancelOrReturnOrder({ order_id: uid, status: value }))
        window.location.reload()
    }

    if (order_loading || !product || !address || !orderdata) {
        return (
           <Loading />
        )

    }


    return (
        <Layout>
            <div className="bg-white my-10 flex flex-col justify-between">

                <div className="pb-3 mb-5">
                    <h1 className="text-center align-center text-3xl font-bold text-gray-800">Order Details</h1>
                </div>
                <hr />
                <div>
                    <div className='border-b'>
                        <div className="grid grid-cols-2">
                            <div className='flex flex-col justify-between my-3'>
                                <div className="flex flex-row mx-auto">
                                    <Link to={`/product/${product.uid}`}>
                                        <img className='w-40 h-auto block mb-3' src={`${BaseUrl}/${product.image}`} alt='product' />
                                    </Link>
                                </div>
                            </div>
                            <div className='flex justify-between'>
                                <div className='text-indigo-500 mx-5 md:mt-3 pt-4'>
                                    <Link to={`/product/${product.uid}`}>
                                        <h3 className="uppercase text-black text-2xl font-medium">{product?.product_name}
                                        </h3>
                                    </Link>


                                    <p className='text-lg'> Quantity : {order.quantity}</p>

                                    <div className='flex justify-between'>
                                    </div>
                                    <div className=''>

                                        <h3 className="font-semibold text-base text-gray-70"> <del className="mb-1 text-md text-red-600 line-through">M.R.P. {order.total_actual_amount}</del> {order.total_discount_percentage} % OFF</h3>
                                        <h3 className="text-2xl font-semibold mb-1"> Rs. {order.total_effective_amount}</h3>
                                        <p className='text-gray-500 '>Vol. {product.volume} ML</p>
                                        <p>Payment mode : {mapPaymentCodeToLabel(order.payment_mode)}</p>
                                        <p>Payment status : {mapPaymentStatusToLabel(order.payment_status)}</p>
                                        <p className={`text-xl font-semibold mb-1 ${order.order_status === 'C' ? 'text-red-500' : 'text-green-500'}`}>
                                            Order Status: {mapOrderStatusToLabel(order.order_status)}
                                        </p>


                                    </div>
                                    <div className="flex flex-row justify-between my-2">
                                        {order.order_status === 'D' ? (
                                            <button
                                                className='font-semibold bg-gray-200 bg:bg-gray-300 text-gray-900 p-2 rounded-lg'
                                                onClick={() => handleCancelOrReturn('R')}
                                            >
                                                return
                                            </button>
                                        ) : (
                                            order.order_status !== 'C' ?
                                                <button
                                                    className='font-semibold bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg'
                                                    onClick={() => handleCancelOrReturn('C')}
                                                >cancel</button>
                                                : (
                                                    ""
                                                )
                                        )}

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className='container mx-auto m-1 h-100 w-90 flex'>
                        <div className="sm:grid grid-cols-1 md:grid grid-cols-2 gap-4">
                            <ul className="list-inside space-y-2 justify-start bg-gray-100 m-2">
                                <div className="flex flex-row justify-between px-4 py-2 text-gray-800">
                                    <button className='mr-5 block font-semibold text-center'> Delivery Boy Detail</button>
                                </div>
                                {deliveryBoy.length !== 1 ?
                                    (<>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold text-gray-400">Name</div>
                                            <div className="px-4 py-2"> {deliveryBoy.user.first_name} {deliveryBoy.user.last_name} </div>
                                        </div>

                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold text-gray-400">Email</div>
                                            <div className="px-4 py-2"> {deliveryBoy.user.email} </div>
                                        </div>

                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold text-gray-400">Phone No.</div>
                                            <div className="px-4 py-2"> {deliveryBoy.user.phone}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold text-gray-400">Alternate phone</div>
                                            <div className="px-4 py-2"> {deliveryBoy.user.phone}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold text-gray-400">Gender</div>
                                            <div className="px-4 py-2"> {mapGenderCodeToLabel(deliveryBoy.user.gender)}</div>
                                        </div>
                                    </>
                                    )
                                    :
                                    (
                                        <>
                                            <h2 className='text-center'>Delivery boy not assigned yet.</h2>
                                        </>
                                    )
                                }
                            </ul>

                            <ul className="list-inside space-y-2 justfiy-end bg-gray-100 m-2">
                                <div className="flex flex-row justify-between px-4 py-2 text-gray-800">
                                    <button className='mr-5 block font-semibold text-center'> Deliver to {mapAddressCodeToLabel(address.type)} Address</button>
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
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default OrderDetail