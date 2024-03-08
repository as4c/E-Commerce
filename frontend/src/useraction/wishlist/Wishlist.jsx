import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadWishlist, removeFromWishlist } from '../../features/actions/wishlistAction';
import { BaseUrl } from '../../backend';
import { addToCart } from '../../features/actions/cartAction';
import Layout from '../../homepage/Layout';


const Wishlist = () => {

    const dispatch = useDispatch();
    const [add, setAdd] = useState(0);
    const [remove, setRemove] = useState(0);

    const removeItem = (uid) => {
        dispatch(removeFromWishlist(uid));
        setRemove(remove + 1);
    }
    const { data } = useSelector((state) => state.wishlist);
    useEffect(() => {
        document.title = 'Your wishlists';
    }, []);
    useEffect(() => {
        dispatch(loadWishlist());
    }, [dispatch, add, remove]);

    const AddToCart = (uid) => {  
        dispatch(addToCart({ uid }))  
    }


    return (
        <Layout>
            <div className="bg-white">
                <div className="pb-3 mb-5">
                    <h1 className="text-center align-center text-3xl font-bold text-gray-800">Your Wishlist</h1>
                </div>
                <hr />

                {data && data.length > 0 ? (
                    <div>
                        {data.map((product) => (
                            <div key={product.uid} className='border-b'>
                                <div className="grid grid-cols-2">
                                    <div className='flex flex-col justify-between'>
                                        <div className="flex flex-row mx-auto">
                                            <img className='w-40 h-auto block mb-3' src={`${BaseUrl}/${product.product?.image}`} alt='product image' />
                                            <div className="start inline">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span className="text-sm text-slate-800 inline">4.9</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-row mx-auto mb-2">
                                            <div className='border-r-3'>
                                                <div className='px-5 py-2 bg-red-600 hover:bg-red-700 rounded-lg'>
                                                    <button onClick={() => removeItem(product.uid)} className='text-xl text-white'> Remove </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    <div className='flex justify-content'>
                                        <div className='text-indigo-500 mx-5 md:mt-3 pt-4'>
                                            <h3 className="uppercase text-black text-2xl font-medium">{product.product?.product_name}
                                            </h3>
                                            <p>category : {product.product?.category}</p>
                                            
                                            <div className='flex justify-between'>
                                                <div className="start">
                                                    <del className="text-xl font-semibold mb-1 text-red-700 line-through">
                                                        M.R.P {product.product.actual_price}
                                                    </del>
                                                    <h3 className="text-2xl font-semibold mb-1">Rs. {product.product.effective_price}</h3>
                                                    <p className="font-semibold text-base text-gray-70">{product.product.discount} % OFF</p>
                                                    <p className='text-gray-500 '>Vol. {product.product.volume} ML</p>
                                                    <small className='mb-7'>Brand : {product.product.brand_name}</small>
                                                </div>
                                            </div>
                                            <div className="flex justify-end p-3 mt-2">
                                                <div className='flex items-center space-x-1.5 rounded-lg bg-blue-500 px-2 py-2 mx-5 text-white duration-100 hover:bg-blue-600 '>
                                                    <button
                                                        onClick={() => AddToCart({ uid: product.product.uid })}
                                                        className="text-lg">
                                                        Add to cart
                                                    </button>
                                                    </div>
                                                <div className="flex items-center space-x-1.5 rounded-lg bg-orange-500 hover:bg-orange-600 px-5 py-2 text-white duration-100">
                                                    <button className="text-lg">Buy Now</button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        ))}
                    </div>

                )
                    :
                    (
                        <div className="pb-3 mb-5">
                            <h1 className="text-center align-center text-3xl font-bold text-gray-800">Your cart is empty.</h1>
                        </div>
                    )}

            </div>
        </Layout >

    );
};


export default Wishlist;