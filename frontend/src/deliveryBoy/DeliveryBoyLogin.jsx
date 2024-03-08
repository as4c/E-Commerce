import React, { useEffect, useState } from 'react'
import Layout from '../homepage/Layout';
import {DeliveryBoyLogin} from '../features/actions/deliveryBoyActions'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';

const DeliveryBoyLoginPage = () => {
    const [deliveryBoyID, setdeliveryBoyID] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        document.title = 'Delivery boy login';
    }, []);
    const onChange = (e) =>{
        setdeliveryBoyID(e.target.value);
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const res1 = await dispatch(DeliveryBoyLogin(deliveryBoyID));
        const res = unwrapResult(res1);
        if (!res.errors) {
            Swal.fire({
                icon : 'success',
                title : 'Successfull Login.',
                text : "Welcom back to your dashboard."
            });
            setdeliveryBoyID("");
            navigate('/user/deliveryboy/dashboard');
        }
        else {
            const errorFields = Object.keys(res.errors);
            const errorMessage = errorFields.map(field => `${field}: ${res.errors[field][0]}`).join('\n');
            Swal.fire({
                icon: 'error',
                title: 'Failed.',
                text: errorMessage,
            });
        }
        
    }
    return (
        <Layout >
        <div className='min-h-screen flex items-center justify-center m-5'>
            <div className='bg-white p-8 rounded shadow-md max-w-md'>
                <h2 className='text-2xl text-center text-orange-700'>Go To Delivery Dashboard</h2>
                <hr />
                <form onSubmit={handleSubmit} className='m-3'>
                    <label htmlFor="email" className='text-gray-400 text-semibold'>Enter your DeliveryBoyID </label>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 hover:outline-none hover:ring-2 hover:ring-orange-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                        </svg>
                        <input className = "pl-2 outline-none border-none"
                            type = "text" name = "deliveryBoyID" 
                            placeholder = "deliveryBoyID"
                            value = {deliveryBoyID}
                            onChange = {onChange}
                            required
                        />
                    </div>

                    <button type="submit" className='block w-full bg-orange-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 hover:bg-orange-700'>Enter</button>
                </form>
            </div>
        </div>
        </Layout>
    )
}

export default DeliveryBoyLoginPage;