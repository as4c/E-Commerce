import React from 'react'
import { useNavigate } from 'react-router-dom'

const SelectPayment = ({ payment, setPayment }) => {
    const navigate = useNavigate();

    const handleChange = (event) => {
        const selectedPayment = event.target.value;
        setPayment(selectedPayment);
    }
    return (
        <div className='container my-10 flex flex-col justify-center items-center'>
            <title>Select Payment mode</title>
            <div className="pb-3 mb-5">
                <h1 className="text-center align-center text-3xl font-bold text-gray-800">Select Payment Mode</h1>
            </div>
            <div className="bg-white p-3 shadow-sm rounded-sm">
                <div className="mb-4 hover:outline-none hover:ring-2 hover:ring-orange-500">

                    <select
                        name="payment"
                        value={payment}
                        onChange={handleChange}
                        className="w-full text-gray-500 px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                        <option value="" className='text-gray-400'>Payment Mode...</option>
                        <option value="ONL">Online</option>
                        <option value="COD">Case on delivery</option>
                
                    </select>
                </div>
            </div>
            <button onClick={()=> navigate('/user/order')} className='ml-5 bg-orange-500 hover:bg-orange-600 py-1.5 px-4 font-semibold text-gray-200 rounded-lg'>Order Now</button>
        </div>

    )
}

export default SelectPayment;