import React, { useEffect } from 'react'

const ProductFilter = ({ data, setSortedData }) => {

    const handleFilter = (type, value) => {
        switch (type) {
            case 'price':
                if (value === 'lth') {
                    data.sort((a, b) => a.effective_price - b.effective_price);
                } else if (value === 'htl') {
                    data.sort((a, b) => b.effective_price - a.effective_price);
                }
                console.log("data...", data);
                break;

        
            case 'price-range':
                const [min, max] = value.split('t').map(Number);

                if (isNaN(min) || isNaN(max)) {
                    break;
                }

                data = data.filter(
                    (product) => product.effective_price >= min && product.effective_price <= max
                );
                break;

            case 'date':
                if (value === 'na') {
                    data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                } else if (value === 'op') {
                    data.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
                }
                break;

            default:
                break;
        }
        setSortedData(data);
    };
   
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
                    onChange={(e) => handleFilter('effective_price', e.target.value)}
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
                    onChange={(e) => handleFilter('effective_price-range', e.target.value)}
                >
                    <option value="" className='text-green-500 text-xl font-semibold'> Price Range </option>
                    <option value="100t500" className=''> 100 to  500</option>
                    <option value="500t1000" className=''>500 to 1000</option>
                    <option value="1000t1500" className=''>1000 to 1500</option>
                    <option value="1500t2000" className=''>1500 to 2000</option>
                    <option value="2000t3000" className=''>2000 to 3000</option>
                    <option value="3000t4000" className=''>3000 to 4000</option>
                    <option value="4000t5000" className=''>4000 to 5000</option>
                    <option value=">5000" className=''> more than 5000</option>
                </select>
            </div>
            
            <div className="flex flex-row my-2 align-middle">

                <select
                    name="date"
                    id="date"
                    className="px-5 py-2 w-22 focus:outline-none focus:shadow-outline"
                    onChange={(e) => handleFilter('date', e.target.value)}
                >
                    <option value="" className='text-green-500 font-bold'>Date</option>
                    <option value="na">Newly added</option>
                    <option value="op">Older product</option>
                </select>
            </div>
        </div>

    )
}

export default ProductFilter