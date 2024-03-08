// ResetPasswordForm.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from '../backend';

const ResetPasswordForm = ({ uid, token }) => {
    useEffect(() => {
        document.title = 'Forget password';
    }, []);
    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [values, setValues] = useState({
        password: "",
        confirmPassword: "",
    });
    const { password, confirmPassword } = values;
    
    const handleChange = (name) =>
        (event) => {
            setValues({ ...values, [name]: event.target.value });

        };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setErrorMsg("Password and Confirm Password don't match");
            return;
        }

        try {
            const response = await axios.post(
                `${API}/accounts/reset-password/${uid}/${token}/`,
                { password, password2: confirmPassword }
            );

            // Password reset successfully
            setSuccessMsg(response.data.msg);
            setErrorMsg('');
        } catch (error) {
            console.error('Error resetting password:', error);
            setSuccessMsg('');
            setErrorMsg('An error occurred while resetting the password. Please try again.');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='min-h-screen flex items-center justify-center m-5'>
            <div className='bg-white p-8 rounded shadow-md max-w-md'>
                <h2 className='text-2xl text-center text-orange-700'>Reset Password</h2>
                <hr />
                <form onSubmit={handleSubmit} className='m-3'>
                    <div className="flex items-center border-2 py-2 px-3 m-3 rounded-2xl hover:outline-none hover:ring-2 hover:ring-orange-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <input className="pl-2 outline-none border-none"
                            type={showPassword ? 'text' : 'password'}
                            name="password" id=""
                            placeholder="Password"
                            value={password}
                            onChange={handleChange("password")}
                            required
                        />
                        <span onClick={togglePasswordVisibility} className="cursor-pointer text-gray-400">
                            {showPassword ? 'Hide' : 'Show'}
                        </span>
                    </div>
                    <div className="flex items-center border-2 py-2 px-3 m-3 rounded-2xl hover:outline-none hover:ring-2 hover:ring-orange-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                        <input className="pl-2 outline-none border-none"
                            type={showPassword ? 'text' : 'password'}
                            name="confirmPassword" id=""
                            placeholder="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange("confirmPassword")}
                            required
                        />
                        <span onClick={togglePasswordVisibility} className="cursor-pointer text-gray-400">
                            {showPassword ? 'Hide' : 'Show'}
                        </span>
                    </div>
                    {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
                    <button type="submit" className="block w-full bg-orange-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 hover:bg-orange-700">Reset Password</button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordForm;
