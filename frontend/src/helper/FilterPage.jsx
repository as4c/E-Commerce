import React from 'react'

const FilterPage = ({ setType, setValues}) => {
    const handleFilter = (type, value) => {
        setType(type);
        setValues(value);
    }
    return (
        <div className="relative group flex flex-row justify-center align-middle">

            {/* filter by order status */}
            <div className='my-2'>
                <h2 className="text-xl font-semibold">Filter By </h2>
            </div>
            <hr />
            <div className="flex flex-row my-2 mx-5 align-middle">

                <select
                    name="order-status"
                    id="order-status"
                    className="px-5 py-2 w-22 focus:outline-none focus:shadow-outline border-none"
                    onChange={(e) => handleFilter('order_status', e.target.value)}
                >
                    <option value="" className='text-green-500 text-xl font-semibold'> Order Status</option>
                    <option value="" className=''>All</option>
                    <option value="A" className=''>Placed</option>
                    <option value="B">Confirmed</option>
                    <option value="P">Packed</option>
                    <option value="O">On the way</option>
                    <option value="D">Delivered</option>
                    <option value="R">Returned</option>
                    <option value="C">Cancelled</option>
                </select>
            </div>

            {/* filter by payment status */}
            <div className="flex flex-row my-2 align-middle">

                <select
                    name="payment-status"
                    id="payment-status"
                    className="px-5 py-2 w-22 focus:outline-none focus:shadow-outline"
                    onChange={(e) => handleFilter('payment_status', e.target.value)}
                >
                    <option value="" className='text-green-500 font-bold'>Payment Status</option>
                    <option value="S">Success</option>
                    <option value="F">Failed</option>
                    <option value="P">Pending</option>
                </select>
            </div>
        </div>

    )
}

export default FilterPage