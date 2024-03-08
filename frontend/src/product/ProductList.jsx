import React from 'react'
import { Link } from 'react-router-dom'
import { timeAgo } from '../helper'
import { BaseUrl } from '../backend'
import WishlistButton from './Component/WishlistButton'
import CartButton from './Component/CartButton'
import BuyNowButton from './Component/BuyNowButton'
import StockNotify from './StockNotify'

const ProductList = ({ data }) => {

    return (
        <div>
            {/* <!-- Product List --> */}
            <section className="py-5 bg-gray-100 ">
                <div className="mx-auto grid max-w-6xl  grid-cols-2 gap-6 p-6 pb-2 my-auto py-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {data && data.map((product) => (
                        <article key={product.uid} className="rounded-xl bg-white p-3 pb-1 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 relative ">
                            <div className="flex flex-col h-full justify-between">
                                <WishlistButton uid={product.uid} />
                                <Link to={`/product/${product.uid}`}>
                                    <div className="relative flex justify-center items-end overflow-hidden rounded-xl flex-grow h-50">

                                        {product.image ? (
                                            <img src={`${product.image}`} alt="Product" className='w-40 h-auto items-center ' />
                                        ) : (
                                            <img src="https://glensandtonics.com/cdn/shop/products/BLACK-DOG-CENTENERY-SCOTCH-848.jpg?v=1678712163" alt="Default Product" className='w-40 h-auto items-center' />
                                        )}
                                        <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span className="ml-1 text-sm text-slate-800">4.9</span>
                                        </div>
                                    </div>

                                    <div className="mt-1 p-2 flex-grow">
                                        <h3 className="text-slate-700">{product.product_name}</h3>
                                        <p className='text-sm font-bold text-blue-500 text-start'>{product.brand_name ? product.brand_name : " "}</p>
                                        <p className='text-sm font-bold text-gray-500 text-start'>{product.volume ? product.volume : " 0"} ML. </p>
                                        <div className='mt-3'>
                                            <div className='flex justify-between'>
                                                <p className="text-sm text-gray-500 text-left line-through ml-5">MRP.₹{product.actual_price}</p>
                                                <p className='text-gray-600 text-end text-sm font-semibold'>{product.discount} % OFF </p>
                                            </div>
                                            <div className='flex justify-between'>
                                                <p className="text-lg font-bold text-blue-500 text-start">₹ {product.effective_price}</p>
                                                <p className="mt-1 text-sm text-slate-400 text-end">added {timeAgo(product.created_at)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                                <div className="flex items-end justify-between p-2 bottom-0">
                                    <CartButton uid={product.uid} />
                                    {product.stock > 0 ?
                                        <BuyNowButton uid={product.uid} />
                                        :
                                        <StockNotify product_id={product.uid} />                                    }
                                </div>
                            </div>
                        </article>
                    ))}

                </div>
            </section>
        </div>
    )
}

export default ProductList