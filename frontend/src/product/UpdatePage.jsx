import React, {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Layout from '../homepage/Layout';
import { BaseUrl } from '../backend';
import UpdateModal from './UpdateModal';
import Loading from '../helper/Loading';


const UpdatePage = () => {
    const [showModal, setShowModal] = useState(false);
    const [showName, setShowName] = useState(false);
    const [showBrandName, setShowBrandName] = useState(false);
    const [showPrice, setShowPrice] = useState(false);
    const [showDiscount, setShowDiscount] = useState(false);
    const [showVolume, setShowVolume] = useState(false);
    const [showImage, setShowImage] = useState(false);
    const [showCategory, setShowCategory] = useState(false);
    const [showDescription, setShowDescription] = useState(false);
    const [showStock, setShowStock] = useState(false);
    const [showDate, setShowDate] = useState(false);

    
    const { uid } = useParams();
   
    const { data } = useSelector((state) => state.category);
  
    const { loading, list, error } = useSelector(
        (state) => state.seller
    );
    const product = list.filter(product => product.uid === uid);
    
    if(loading){
        return (
            <Loading />
        )
    }

    const showModalHandler = () => {
        setShowModal(true);
    };
    const hideModalHandler = () => {
        setShowModal(false);
        setShowName(false);
        setShowBrandName(false);
        setShowPrice(false);
        setShowDiscount(false);
        setShowVolume(false);
        setShowImage(false);
        setShowCategory(false);
        setShowDescription(false);
        setShowStock(false);
        setShowDate(false);
    };
    

    const setName = () => {
        setShowName(true);
    }

    const setBrandName = () => {
        setShowBrandName(true);
    }

    const setPrice = () => {
        setShowPrice(true);
    }

    const setDiscount = () => {
        setShowDiscount(true);
    }

    const setVolume = () => {
        setShowVolume(true);
    }

    const setImage = () => {
        setShowImage(true);
    }

    const setCategory = () => {
        setShowCategory(true);
    }

    const setDescription = () => {
        setShowDescription(true);
    }

    const setStock = () => {
        setShowStock(true);
    }

    const setDate = () => {
        setShowDate(true);
    }

    const renderDetailRow = (label, value) => (
        <tr className='border-b-2 mt-5'>
            <td>
                <p className='font-semibold text-gray-400 inline'>{label}:</p> {value}
            </td>
            <td>
                <button onClick={showModalHandler} className='block bg-emerald-500 hover:bg-emerald-700 text-white rounded-md m-1 text-center mx-auto px-5 py-1'>
                    Edit
                </button>
            </td>
        </tr>
    );

    return (
        <Layout>
            <div className='my-auto'>
                <UpdateModal
                    hideModalHandler={hideModalHandler}
                    showModal={showModal}
                    name={showName}
                    brand={showBrandName}
                    price={showPrice}
                    description={showDescription}
                    image={showImage}
                    cat={showCategory}
                    dct={showDiscount}
                    vol={showVolume}
                    ex_date={showDate}
                    stocks={showStock}
                />

            </div>

            <div className="bg-white">
                <div className='bg-white rounded shadow-md max-w-lg p-5 flex flex-col items-center justify-center bg-blur mx-auto my-auto' >

                    <h1 className="text-center text-2xl font-bold text-gray-800 mb-2">Edit Product Data</h1>
                    <hr />

                    <div className='container mx-auto p-5'>
                        <table className="table-auto mt-3 border-collapse w-full ">
                            <thead className='w-full mb-5 p-2'>
                                <tr className='px-auto mx-auto items-center bg-slate-200 border-b py-6'>
                                    <th scope="col" className='mx-auto px-5 '> Product Data </th>
                                    <th scope="col" className='mx-auto px-5'> Actions </th>
                                </tr>
                            </thead>

                            <tbody className='w-full mt-5 pt-5'>
                                {product && product.map((product) => (
                                    <React.Fragment key={product.uid}>
                                        <tr className='border-b-2'>
                                            <td className='justify-center flex'>

                                                <img src={`${BaseUrl}/${product.image}`} alt="No Product Image" className='max-w-full h-40' />

                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => {
                                                        showModalHandler();
                                                        setImage();
                                                    }}
                                                    className='block bg-emerald-500 hover:bg-emerald-700 text-white rounded-md m-1 text-center mx-auto px-5 py-1'
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                        <tr className='border-b-2'>
                                            <td>
                                                <p className='font-semibold text-gray-400 inline'> Product Name : </p>
                                                {product.product_name}
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => {
                                                        showModalHandler();
                                                        setName();
                                                    }}
                                                    className='block bg-emerald-500 hover:bg-emerald-700 text-white rounded-md m-1 text-center mx-auto px-5 py-1'
                                                >
                                                    Edit
                                                </button>

                                            </td>
                                        </tr>

                                        <tr className='border-b-2'>
                                            <td>
                                                <p className='font-semibold text-gray-400 inline'> Actual Price : </p>
                                                Rs. {product.actual_price}
                                            </td>
                                            <td>
                                                <button onClick={() => {showModalHandler(); setPrice();}} 
                                                className=' block bg-emerald-500 hover:bg-emerald-700 text-white rounded-md m-1 text-center mx-auto px-5 py-1'>
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>

                                        <tr className='border-b-2'>
                                            <td>
                                                <p className='font-semibold text-gray-400 inline'> Discount : </p>
                                                {product.discount} %
                                            </td>
                                            <td>
                                                <button onClick={() => {showModalHandler(); setDiscount();}} 
                                                className=' block bg-emerald-500 hover:bg-emerald-700 text-white rounded-md m-1 text-center mx-auto px-5 py-1'>Edit</button>
                                            </td>
                                        </tr>

                                        <tr className=' border-b-2'>
                                            <td>
                                                <p className='font-semibold text-gray-400 inline'> Brand Name : </p>
                                                {product.brand_name}
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => { showModalHandler(); setBrandName(); }}
                                                    className=' block bg-emerald-500 hover:bg-emerald-700 text-white rounded-md m-1 text-center mx-auto px-5 py-1'>Edit</button>
                                            </td>
                                        </tr>

                                        <tr className='border-b-2'>
                                            <td>
                                                <p className='font-semibold text-gray-400 inline'> Category : </p>
                                                {product.category}
                                            </td>
                                            <td>
                                                <button onClick={()=> {showModalHandler(); setCategory();}} className=' block bg-emerald-500 hover:bg-emerald-700 text-white rounded-md m-1 text-center mx-auto px-5 py-1'>Edit</button>
                                            </td>
                                        </tr>

                                        <tr className='border-b-2'>
                                            <td>
                                                <p className='font-semibold text-gray-400 inline'> Stocks : </p>
                                                {product.stock}
                                            </td>
                                            <td>
                                                <button onClick={()=>{showModalHandler(); setStock()}} className=' block bg-emerald-500 hover:bg-emerald-700 text-white rounded-md m-1 text-center mx-auto px-5 py-1'>Edit</button>
                                            </td>
                                        </tr >

                                        <tr className='border-b-2'>
                                            <td>
                                                <p className='font-semibold text-gray-400 inline'> Volume : </p>
                                                {product.volume} ML.
                                            </td>
                                            <td>
                                                <button onClick={()=>{showModalHandler(); setVolume()}} className=' block bg-emerald-500 hover:bg-emerald-700 text-white rounded-md m-1 text-center mx-auto px-5 py-1'>Edit</button>
                                            </td>
                                        </tr>

                                        <tr className='-center border-b-2'>
                                            <td>
                                                <p className='font-semibold text-gray-400 inline'> Description : </p>
                                                {product.product_description}
                                            </td>
                                            <td>
                                                <button onClick={()=>{showModalHandler(); setDescription()}} className=' block bg-emerald-500 hover:bg-emerald-700 text-white rounded-md m-1 text-center mx-auto px-5 py-1'>Edit</button>
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default UpdatePage;