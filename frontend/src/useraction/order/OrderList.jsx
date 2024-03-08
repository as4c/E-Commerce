import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BaseUrl } from '../../backend';
import Layout from '../../homepage/Layout';
import { loadOrder } from '../../features/actions/orderActions';
import { Watch } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { mapOrderStatusToLabel, mapPaymentStatusToLabel,mapPaymentCodeToLabel } from '../../helper';



const OrderList = () => {
    const dispatch = useDispatch();
    const { order_loading, orders } = useSelector((state) => state.order);

    useEffect(() => {
        document.title = 'Your Orders';
    }, []);
    useEffect(() => {
        dispatch(loadOrder());
    }, [dispatch]);

    if (order_loading) {
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
        <Layout>
            <div className="bg-white">
                <div className="pb-3 mb-5">
                    <h1 className="text-center align-center text-3xl font-bold text-gray-800">Orders</h1>
                </div>
                <hr />

                {orders.orders && orders.orders.length > 0 ? (

                    <div>
                        {orders.orders.map((order, id) => (

                            <div key={id} className='border-b'>
                               <Link to={`/user/orders/${order.order.uid}`} >
                                <div className="grid grid-cols-2">
                                    <div className='flex flex-col justify-between my-3'>
                                        <div className="flex flex-row mx-auto">
                                            
                                            <img className='w-40 h-auto block mb-3' src={`${BaseUrl}/${order.product?.image}`} alt='product' />
                                            <div className="start inline">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span className="text-sm text-slate-800 inline">4.9</span>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div className='flex justify-content'>
                                        <div className='flex justify-between'>
                                            <div className='text-indigo-500 mx-5 md:mt-3 pt-4'>
                                                <h3 className="uppercase text-black text-2xl font-medium">{order.product?.product_name}
                                                </h3>
                                                <p className='text-lg'> Quantity : {order.order.quantity}</p>
                                    
                                                <div className='flex justify-between'>
                                                </div>
                                                <div className=''>

                                                    <h3 className="font-semibold text-base text-gray-70"> <del className="mb-1 text-md text-red-600 line-through">M.R.P. {order.order.total_actual_amount}</del> {order.total_discount_percentage} % OFF</h3>
                                                    <h3 className="text-2xl font-semibold mb-1"> Rs. {order.order.total_effective_amount}</h3>

                                                    <p>Order Status : {mapOrderStatusToLabel(order.order.order_status)}</p>
                                                    <p>Payment mode : {mapPaymentCodeToLabel(order.order.payment_mode)}</p>
                                                    <p>Payment status : {mapPaymentStatusToLabel(order.order.payment_status)}</p>
                                                </div>

                                            </div>

                                        </div>

                                    </div>
                                </div>
                                </Link>
                            </div>

                        ))}

                    </div>

                )
                    :
                    (
                        <div className="pb-3 mb-5 min-h-screen">
                            <h1 className="text-center align-center text-3xl font-bold text-gray-800">You haven't order any products. Buy Now.</h1>
                        </div>
                    )
                }

            </div>
        </Layout >

    )
}

export default OrderList;