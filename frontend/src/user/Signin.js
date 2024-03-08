import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signin } from '../features/actions/authActions';
import Swal from 'sweetalert2';
import { unwrapResult } from '@reduxjs/toolkit';
import Loading from '../helper/Loading';
import GoogleLoginButton from './SocialAuth/GoogleButton';

const Signin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        document.title = 'User login';
    }, []);
    const [showPassword, setShowPassword] = useState(false);
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const { email, password } = values;
    const { previous } = useSelector((state) => state.auth);

    const handleChange = (name) =>
        (event) => {
            setValues({ ...values, [name]: event.target.value });

        };

    const onSubmit = async (event) => {
        event.preventDefault();
        setValues({ ...values });
        const resultAction = dispatch(signin({ email, password }))
        const result = await unwrapResult(resultAction);

        if (!result.errors) {
            Swal.fire({
                icon: 'success',
                title: 'Welcome Back!',
                text: result.msg,
            });
            setValues({
                ...values,
                email: "",
                password: "",
            });
            if (previous !== undefined) {
                navigate(`${previous}`);

            } else {
                navigate('/');
            }
        }
        else {
            const errorFields = Object.keys(result.errors);
            const errorMessage = errorFields.map(field => `${field}: ${result.errors[field][0]}`).join('\n');
            Swal.fire({
                icon: 'error',
                title: 'Login Failed.',
                text: errorMessage,
            });
            setValues({
                ...values,
            });
        }

    };
    const { user_loading, access, isAuthenticated } = useSelector((state) => state.auth);


    const performRedirect = () => {
        if (isAuthenticated && access) {
            return navigate("/")
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    
    if (user_loading) {
        return (
           <Loading />
        );
    }

    return (
        <div className="flex px-40 py-20 min-h-screen rounded-lg">
            <div
                className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-orange-800 to-orange-400 i justify-around items-center hidden rounded-lg">
                <div>
                    <h1 className="text-white font-bold text-4xl font-sans mx-auto">Bewra.com</h1>
                    <p className="text-white mt-1">The most popular brewery product seller all over the world.</p>
                    <button type="submit" className="block w-28 bg-white text-indigo-800 mt-4 py-2 rounded-2xl font-bold mb-2">Read More</button>
                </div>
                <div className="absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                <div className="absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                <div className="absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                <div className="absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            </div>
            <div className="flex w-1/2 justify-center items-center bg-gray-100 rounded-lg">
                <form className="bg-white m-5 p-5 rounded-lg">
                    <h1 className="text-gray-800 font-bold text-2xl mb-1">Hello Again!</h1>
                    <p className="text-sm font-normal text-gray-600 mb-7">Welcome Back</p>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 hover:outline-none hover:ring-2 hover:ring-orange-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <input className="pl-2 outline-none border-none"
                            type="text" name="email" id=""
                            placeholder="Email"
                            value={email}
                            onChange={handleChange("email")}
                            required
                        />
                    </div>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl hover:outline-none hover:ring-2 hover:ring-orange-500">
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

                    <button type="submit" onClick={onSubmit}
                        className="block w-full bg-orange-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 hover:bg-orange-700">
                        Signin
                    </button>


                    <div className="flex items-center space-x-4">
                        <hr className="w-full border border-gray-300" />
                        <div className="font-semibold text-gray-400">OR</div>
                        <hr className="w-full border border-gray-300" />
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="mb-3">
                            <GoogleLoginButton />
                        </div>
                    </div>
                    <span className="text-sm m-2 hover:text-blue-500 cursor-pointer">Forgot Password ?</span>
                    <p className="m-2 text-sm font-semibold cursor-pointer text-gray-400">Don't have an Account ? <Link to={'/signup'} className='hover:text-orange-700 text-blue-500'>Signup</Link> </p>
                </form>
                {performRedirect()}
            </div>
        </div>
    )
};


export default Signin;
