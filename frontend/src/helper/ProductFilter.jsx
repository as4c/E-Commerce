import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { filterProduct } from '../features/actions/productActions';

const ProductFilter = () => {

    const [sorted, setSorted] = useState('');
    const [price_range, setPriceRange] = useState('');
    const [date, setDate] = useState('');
    const dispatch = useDispatch();
   
    const applyFilter = ()=> {
        dispatch(filterProduct({sorted, price_range, date}));
    }
    return (
        <div className="relative group flex flex-row justify-center align-middle">

            {/* filter by order status */}
            <div className='my-2'>
                <h2 className="text-xl font-semibold">Sort By </h2>
            </div>
            <hr />
            <div className="flex flex-row my-2 mx-5 align-middle">

                <select
                    name="effective_price"
                    id="effective_price"
                    className="px-5 py-2 w-22 focus:outline-none focus:shadow-outline border-none"
                    onChange={(e) => setSorted(e.target.value)}
                >
                    <option value="" className='text-green-500 text-xl font-semibold'> Price </option>
                    <option value="lth" className=''>Low to high</option>
                    <option value="htl" className=''>High to low</option>
                </select>
            </div>
            {/* effective_price range */}
            <div className="flex flex-row my-2 mx-5 align-middle">

                <select
                    name="effective_price-range"
                    id="effective_price-range"
                    className="px-5 py-2 w-22 focus:outline-none focus:shadow-outline border-none"
                    onChange={(e) => setPriceRange(e.target.value)}
                >
                    <option value="" className='text-green-500 text-xl font-semibold'> Price Range </option>
                    <option value="100t500" className=''> Under 500</option>
                    <option value="500t1000" className=''>Under 1000</option>
                    <option value="1000t1500" className=''>Under 1500</option>
                    <option value="1500t2000" className=''>Under 2000</option>
                    <option value="2000t3000" className=''>Under 3000</option>
                    <option value="3000t4000" className=''>Under 4000</option>
                    <option value="4000t5000" className=''>under 5000</option>
                    <option value=">5000" className=''> more than 5000</option>
                </select>
            </div>
            
            <div className="flex flex-row my-2 align-middle">
                <select
                    name="date"
                    id="date"
                    className="px-5 py-2 w-22 focus:outline-none focus:shadow-outline"
                    onChange={(e) => setDate(e.target.value)}
                >
                    <option value="" className='text-green-500 font-bold'>Date</option>
                    <option value="na">Newly added</option>
                    <option value="op">Older product</option>
                </select>
            </div>
            <div className='my-2'>
                <button onClick={applyFilter}
                className='px-2 py-1 bg-emerald-600 hover:bg-emerald-500 mx-2 rounded-lg'
                >Apply filter</button>
            </div>
        </div>

    )
}

export default ProductFilter