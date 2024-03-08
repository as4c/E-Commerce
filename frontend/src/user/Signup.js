
import  { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../features/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { unwrapResult } from '@reduxjs/toolkit';
import { Watch } from 'react-loader-spinner';
import GoogleLoginButton from './SocialAuth/GoogleButton';
import Loading from '../helper/Loading';


const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        document.title = 'User Signup';
    }, []);
    
    const [values, setValues] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        phone: "",
        gender: "",
        password: "",
        password2: "",
        success: false,
    });

    const [profilePic, setProfilePic] = useState(null);

    const ProfileImageUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            setProfilePic(file);
            console.log("File name:", file.name);
        }else{
            console.log("he submitted data is not a file")
        }
    }

    const { first_name, last_name, username, email, phone, gender, password, password2 } = values;
    const handleChange = (user) =>
        (event) => {
            setValues({ ...values, [user]: event.target.value });

        };


    const onSubmit = async(event) => {
        event.preventDefault();
        setValues({ ...values});
       
        const resultAction = await dispatch(signup({ first_name, last_name, username, email, profilePic, phone, gender, password, password2 }));
        const result = unwrapResult(resultAction);  
        // console.log("check 2", result);
        if (!result.errors) {
            Swal.fire({
                icon: 'success',
                title: 'Signup Successfull.',
                text: result.msg,
              });
            setValues({
                ...values,
                username: "",
                email: "",
                phone: "",
                gender: "",
                password: "",
            });
            setProfilePic(null)
            navigate('/signin')
        }
        else{
            const errorFields = Object.keys(result.errors);
            const errorMessage = errorFields.map(field => `${field}: ${result.errors[field][0]}`).join('\n');
            Swal.fire({
                icon: 'error',
                title: 'Signup Failed.',
                text: errorMessage,
              });
            setValues({
                ...values,
            });
        }
       
    }

    
    const {loading} = useSelector((state)=> state.auth);
    if (loading) {
        return (
           <Loading />
        );
    }
    

    return (
        <div className="px-40 py-20 min-h-screen rounded-lg md:flex">
            <div
                className="relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-orange-800 to-orange-400 i justify-center items-center hidden rounded-lg">
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
            <div className="flex w-1/2  justify-center py-10 items-center bg-gray-100 shadow-lg rounded-lg">
                <form className="bg-white p-3 rounded-lg" >
                    <h1 className="text-gray-800 font-bold text-2xl mb-1">Welcome!</h1>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 hover:outline-none hover:ring-2 hover:ring-orange-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd" />
                        </svg>
                        <input className="pl-2 outline-none border-none"
                            type="text" name="first_name" id="" placeholder="First name"
                            value={first_name}
                            onChange={handleChange("first_name")}
                            required
                        />
                    </div>

                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 hover:outline-none hover:ring-2 hover:ring-orange-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd" />
                        </svg>
                        <input className="pl-2 outline-none border-none"
                            type="text" name="last_name"
                            id=""
                            placeholder="Last name"
                            value={last_name}
                            onChange={handleChange("last_name")}
                            required
                        />
                    </div>

                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 hover:outline-none hover:ring-2 hover:ring-orange-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                        </svg>
                        <input className="pl-2 outline-none border-none"
                            type="text" name="username" id=""
                            placeholder="Username"
                            value={username}
                            onChange={handleChange("username")}
                            required
                        />
                    </div>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 hover:outline-none hover:ring-2 hover:ring-orange-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                        </svg>
                        <input className="pl-2 outline-none border-none"
                            type="text" name="email" id=""
                            placeholder="Email"
                            value={email}
                            onChange={handleChange("email")}
                            required
                        />
                    </div>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 hover:outline-none hover:ring-2 hover:ring-orange-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5 text-gray-400' height="16" width="14" viewBox="0 0 512 512"><path d="M375.8 275.2c-16.4-7-35.4-2.4-46.7 11.4l-33.2 40.6c-46-26.7-84.4-65.1-111.1-111.1L225.3 183c13.8-11.3 18.5-30.3 11.4-46.7l-48-112C181.2 6.7 162.3-3.1 143.6 .9l-112 24C13.2 28.8 0 45.1 0 64v0C0 295.2 175.2 485.6 400.1 509.5c9.8 1 19.6 1.8 29.6 2.2c0 0 0 0 0 0c0 0 .1 0 .1 0c6.1 .2 12.1 .4 18.2 .4l0 0c18.9 0 35.2-13.2 39.1-31.6l24-112c4-18.7-5.8-37.6-23.4-45.1l-112-48zM441.5 464C225.8 460.5 51.5 286.2 48.1 70.5l99.2-21.3 43 100.4L154.4 179c-18.2 14.9-22.9 40.8-11.1 61.2c30.9 53.3 75.3 97.7 128.6 128.6c20.4 11.8 46.3 7.1 61.2-11.1l29.4-35.9 100.4 43L441.5 464zM48 64v0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0s0 0 0 0" /></svg>
                        <input className="pl-2 outline-none border-none"
                            type="text" name="" id=""
                            placeholder="Phone"
                            value={phone}
                            onChange={handleChange("phone")}
                            required
                        />
                    </div>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 hover:outline-none text-gray-400 hover:ring-2 hover:ring-orange-500 text-overflow-ellipsis">
                        <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" className='h-5 w-5 text-gray-400 ' viewBox="0 0 448 512"><path d="M304 128a80 80 0 1 0 -160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" /></svg>
                        <input className="pl-2 outline-none border-none text-gray-400 text-overflow-ellipsis"
                            type="file" name="profile_pic" id=""
                            accept='image/*'
                            onChange={ProfileImageUpload}
                            required
                        />
                    </div>
                    <div className="mb-4 hover:outline-none hover:ring-2 hover:ring-orange-500">

                        <select
                            id="gender"
                            name="gender"
                            value={gender}
                            onChange={handleChange("gender")}
                            className="w-full text-gray-500 px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="" className='text-gray-400'>Gender..</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                            <option value="O">Other</option>
                        </select>

                        {gender && (
                            <p className="block mb-2 text-sm text-gray-400">
                                You selected: {gender === "M" ? "Male" : gender === "F" ? "Female" : "Other"}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center border-2 py-2 px-3 mb-4 rounded-2xl hover:outline-none hover:ring-2 hover:ring-orange-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clip-rule="evenodd" />
                        </svg>
                        <input className="pl-2 outline-none border-none"
                            type="text" name="password" id=""
                            placeholder="Password"
                            value={password}
                            onChange={handleChange("password")}
                            required
                        />
                    </div>
                    <div className="flex items-center border-2 py-2 px-3 rounded-2xl hover:outline-none hover:ring-2 hover:ring-orange-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fillRule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clipRule="evenodd" />
                        </svg>
                        <input className="pl-2 outline-none border-none" type="text"
                            name="password2" id="" placeholder="Confirm Password"
                            value={password2}
                            onChange={handleChange("password2")}
                            required
                        />

                    </div>
                    <div className="flex items-start m-2">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                        </div>
                        <label for="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400">I agree with the <a href="/" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
                    </div>
                    <button type="submit"
                        className="block w-full bg-orange-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 hover:bg-orange-700"
                        onClick={onSubmit}
                    >Create Account
                    </button>

                    <div className="flex items-center space-x-4">
                        <hr className="w-full border border-gray-300" />
                        <div className="font-semibold text-gray-400">OR</div>
                        <hr className="w-full border border-gray-300" />
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div class="mb-3">
                            <GoogleLoginButton />
                        </div>  
                    </div>

                    <p className="m-2 cursor-pointer">Already have an Account ? <Link to={'/signin'} className='hover:text-orange-700 text-blue-500'>Signin</Link> </p>
                </form>
            </div>
        </div>

    )
};


export default Signup;
