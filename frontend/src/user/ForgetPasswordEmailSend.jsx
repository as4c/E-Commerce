// ForgotPasswordForm.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../backend';

const ForgotPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    useEffect(() => {
        document.title = 'Send reset password email';
    }, []);
    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${API}/accounts/send-reset-password-email/`,
                { email }
            );

            console.log(("response from reset password...", response))
            setSuccessMsg(response.data.msg);
            setErrorMsg('');
        } catch (error) {
            console.error('Error sending password reset email:', error);
            setSuccessMsg('');
            setErrorMsg('An error occurred while sending the password reset link. Please try again.');
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center m-5'>
            <div className='bg-white p-8 rounded shadow-md max-w-md'>
                <h2 className='text-2xl text-center text-orange-700'>Forget Password</h2>
                <hr />
                <form onSubmit={handleSubmit} className='m-3'>
                <label htmlFor="email" className='text-gray-400 text-semibold'>Enter your registered email </label>
                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 hover:outline-none hover:ring-2 hover:ring-orange-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                    <input className="pl-2 outline-none border-none"
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                    />
                </div>

                {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
                {successMsg && <p style={{ color: 'green' }}>{successMsg}</p>}
                <button type="submit" className='block w-full bg-orange-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 hover:bg-orange-700'>Send Password Reset Link</button>
            </form>
            </div>
        </div>
    );
};

export default ForgotPasswordForm;
