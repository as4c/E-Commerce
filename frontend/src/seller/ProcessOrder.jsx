import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { UpdateOrderStatus, getOrderDetails } from '../features/actions/sellerActions';
import Layout from '../homepage/Layout';
import { Watch } from 'react-loader-spinner';
import { BaseUrl } from '../backend';
import {
  mapAddressCodeToLabel,
  mapGenderCodeToLabel,
  mapOrderStatusToLabel,
  mapPaymentCodeToLabel,
  mapPaymentStatusToLabel,
  mapOderType,
  mapDeliveryTime

} from './helper';
import { DeliverOrPickupParcel } from '../features/actions/deliveryBoyActions';


const ProcessOrder = () => {

  const dispatch = useDispatch();
  const { uid } = useParams();
  const { loading, order_data } = useSelector((state) => state.seller);
  const [status, setStatus] = useState('');
  useEffect(() => {
    document.title = 'Process order';
}, []);
  useEffect(() => {
    dispatch(getOrderDetails({ uid }))
  }, [dispatch, uid, status])



  const product = order_data.product;
  const customer = order_data.customer;
  const address = order_data.address;
  const order = order_data.order;

  const { delivery_boy_loading } = useSelector((state)=>state.deliveryBoy);

  if (loading || !product || !address || !order_data || delivery_boy_loading) {
    return (
      <div className="flex flex-col justify-center mx-auto min-h-screen">
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


  const handleChangeStatus = async (newStatus) => {
    try {
      if(newStatus === 'D'){
        await dispatch(DeliverOrPickupParcel({ uid: uid, status: newStatus }));
        setStatus(newStatus);
    }else{
        await dispatch(UpdateOrderStatus({ uid: uid, status: newStatus }));
        setStatus(newStatus);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };


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
                    <img className='w-40 h-auto block mb-3' src={`${BaseUrl}/${product.image}`} alt='product image' />
                  </Link>
                </div>
              </div>
              <div className='flex justify-between'>
                <div className='text-indigo-500 mx-5 md:mt-3 pt-4'>
                  <Link to={`/product/${product.uid}`}>
                    <h3 className="uppercase text-black text-2xl font-medium">{product?.product_name}
                    </h3>
                    <p className='text-gray-500 '>Vol. {product.volume} ML</p>

                  </Link>


                  <p className='text-lg'> Quantity : {order.quantity}</p>

                  <div className='flex justify-between'>
                  </div>
                  <div className=''>
                    <h4 className="text-xl mb-1">Amount Rs. {order.total_effective_amount}</h4>
                    <p>Payment status : {mapPaymentStatusToLabel(order.payment_status)}</p>
                    <p>Payment mode : {mapPaymentCodeToLabel(order.payment_mode)}</p>
                    <p>Order Type : {mapOderType(order.order_type)}</p>
                    <p>Delivery time : {mapDeliveryTime(order.expected_delivery_time)}</p>
                  </div>
                  <div className="flex flex-row justify-between my-2">
                    <label htmlFor="order-status" className='font-semibold'>Process Order Status</label>
                    <select name="order-status" id="order-status" className='p-3' onChange={(e) => handleChangeStatus(e.target.value)}>
                      <option value="" className='text-green-500'>{mapOrderStatusToLabel(order.order_status)}</option>
                      <option value="A">Placed</option>
                      <option value="B">Confirmed</option>
                      <option value="P">Packed</option>
                      <option value="O">On the way</option>
                      <option value="D">Delivered</option>
                      <option value="R">Returned</option>
                      <option value="C">Cancelled</option>
                    </select>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div className='container mx-auto m-1 h-100 w-90 flex'>
            <div className="sm:grid grid-cols-1 md:grid grid-cols-2 gap-4">
              <ul className="list-inside space-y-2 justify-start bg-gray-100 m-2">
                <div className="flex flex-row justify-between px-4 py-2 text-gray-800">
                  <button className='mr-5 block font-semibold text-center'> Customer Detail</button>
                </div>

                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold text-gray-400">Name</div>
                  <div className="px-4 py-2"> {customer.first_name} {customer.last_name} </div>
                </div>

                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold text-gray-400">Email</div>
                  <div className="px-4 py-2"> {customer.email} </div>
                </div>

                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold text-gray-400">Mobile</div>
                  <div className="px-4 py-2"> {customer.phone}</div>
                </div>

                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold text-gray-400">Gender</div>
                  <div className="px-4 py-2"> {mapGenderCodeToLabel(customer.gender)}</div>
                </div>
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

export default ProcessOrder;