import React, { useEffect, useState } from 'react'
import Layout from '../homepage/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { loadProductList } from '../features/actions/sellerActions';
import { BaseUrl } from '../backend';
import { Link, useNavigate } from 'react-router-dom';
import UpdateModal from '../product/UpdateModal';
import Loading from '../helper/Loading';

const SellerProductLists = () => {
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, list } = useSelector((state) => state.seller);
  useEffect(() => {
    document.title = 'Seller listed product';
  }, []);
  useEffect(() => {
    dispatch(loadProductList());
  }, [dispatch])

  const onUpdate = (uid) => {
    navigate(`/user/seller/update-product/${uid}`)
  }

  if (list.length === 0) {
    return (
      <Loading />
    )
  }


  const showModalHandler = () => {
    setShowModal(true);
  };
  const hideModalHandler = () => {
    setShowModal(false);
  };

  return (
    <Layout>

      <div className='bg-white w-full mx-auto'>
        <div className="pt-10">
          <h1 className="text-center text-2xl font-bold text-gray-800">Your Products</h1>
        </div>

        <div className='pt-5 shadow-md container mx-auto py-5'>
          <table className="table-auto mt-3 border-collapse w-full">
            <thead className='w-full mb-5 p-2'>
              <tr className='px-auto mx-auto items-center bg-slate-200 border-b py-6'>
                <th scope="col" className='mx-auto px-5 '> Product Image </th>
                <th scope="col" className='mx-auto px-5 '> Product Name </th>
                <th scope="col" className='mx-auto px-5 '> Volume(ML) </th>
                <th scope="col" className='mx-auto px-5 '> Price </th>
                <th scope="col" className='mx-auto px-5 '> Stocks </th>
                <th scope="col" className='mx-auto px-5 '> Discount </th>
                <th scope="col" className='mx-auto px-5'> Actions </th>
              </tr>
            </thead>

            <tbody className='w-full mt-5 pt-5'>
              {list && list.map(data => (
                <tr key={data.uid} className='px-auto mx-auto items-center text-center border-b-2'>
                  <td className='justify-center flex'>
                    <Link to={`/product/${data.uid}`}>
                      <img src={`${data.image}`} alt="No Product Image" className='max-w-full h-40' />
                    </Link>
                  </td>
                  <td className=''>
                    <Link to={`/product/${data.uid}`}>
                      {data.product_name}
                    </Link>
                  </td>
                  <td className=''>
                    <Link to={`/product/${data.uid}`}>
                      {data.volume} ML.
                    </Link>
                  </td>
                  <td className=''>Rs. <del className='px-3 text-red-700'>{data.actual_price}.00 </del>   {data.effective_price}.00</td>
                  <td className=''>{data.stock}</td>
                  <td className=''>{data.discount}</td>
                  <td className='text-center items-center flex-row justify-between '>
                    <button onClick={() => onUpdate(data.uid)} className=' block bg-emerald-500 hover:bg-emerald-700 text-white p-2 rounded-md m-1 text-center mx-auto'>Update</button>
                    <button className=' block bg-red-600 hover:bg-red-700 text-white p-2 rounded-md m-2 text-center px-2 mx-auto'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </Layout>
  )
}

export default SellerProductLists