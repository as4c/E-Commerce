import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    mapDeliveryTime,
    mapOderType,
    mapOrderStatusToLabel,
    mapPaymentCodeToLabel,
    mapPaymentStatusToLabel
} from '.';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateOrderStatus } from '../features/actions/sellerActions';

const DisplayOrderList = ({ data }) => {

    const {user} = useSelector((state)=> state.auth);
    const dispatch = useDispatch();

    const [order_status, setStatus] = useState('');

    const handleChangeStatus = async (uid, newStatus) => {
        try {
            await dispatch(UpdateOrderStatus({ uid: uid, status: newStatus }));
            setStatus(newStatus);
            
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };


    return (
        <div>
            {data.map((order, id) => (
                <div key={id} className='border-b'>
                    <div className="grid grid-cols-1 md:grid grid-cols-3">
                        <div className='flex flex-col justify-between my-3'>
                            <Link to={`/user/seller/order-info/${order.order.uid}`} className='grid grid-cols-2' >
                                <div className="flex flex-row mx-auto">

                                    <img className='w-40 h-auto block mb-3' src={`${order.product?.image}`} alt='product image' />
                                    <div className="start inline">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="text-sm inline">4.9</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className='flex justify-content'>
                            <Link to={`/user/seller/order-info/${order.order.uid}`} className='grid grid-cols-2' >
                                <div className='flex justify-between'>
                                    <div className='text-indigo-500 mx-5 md:mt-3 pt-4'>
                                        <h3 className="uppercase text-black text-2xl font-medium">{order.product?.product_name}
                                        </h3>
                                        <p className='text-lg'> Quantity : {order.order.quantity}</p>

                                        <div className='flex justify-between'>
                                        </div>
                                        <div className=''>
                                            <h5 className="text-xl font-semibold mb-1">Amount Rs. {order.order.total_effective_amount}</h5>
                                            <p>Order ID : {order.order.uid} </p>
                                            <p>Order Status : {mapOrderStatusToLabel(order.order.order_status)}</p>
                                            <p>Payment mode : {mapPaymentCodeToLabel(order.order.payment_mode)}</p>
                                            <p>Payment status : {mapPaymentStatusToLabel(order.order.payment_status)}</p>
                                            <p>Order Type : {mapOderType(order.order.order_type)}</p>
                                            <p>Order time : {order.order.created_at}</p>
                                            <p>Delivery time : {mapDeliveryTime(order.order.expected_delivery_time)}</p>
                                        </div>

                                    </div>

                                </div>

                            </Link>
                        </div>

                        <div>
                            <div className="flex flex-col my-2">
                                <label htmlFor="order-status" className='font-semibold'>Process Order Status</label>
                                <select name="order-status" id="order-status" className='px-5 py-2 w-22' onChange={(e) => handleChangeStatus(order.order.uid, e.target.value)}>
                                    <option value="" className='text-green-500'>{mapOrderStatusToLabel(order.order.order_status)}</option>
                                    {user.is_vendor ? 
                                    
                                    (
                                        <>
                                            <option value="B">Confirmed</option>
                                            <option value="P">Packed</option>
                                            <option value="O">On the way</option>
                                        </>
                                    ) 
                                    
                                    : 
                                    
                                    (
                                        <>
                                        <option value="O">On the way</option>
                                        <option value="D">Delivered</option>
                                        <option value="R">Returned</option>
                                        <option value="C">Cancelled</option>
                                        </>
                                    )}
                                    
                                </select>
                            </div>
                        </div>
                    </div>

                </div>

            ))}
        </div>

    );
};

export default DisplayOrderList;
