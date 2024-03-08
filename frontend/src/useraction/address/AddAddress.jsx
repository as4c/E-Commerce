import React, {  useEffect, useState } from 'react'
import { createAddress } from '../../features/actions/addressAction';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import Layout from '../../homepage/Layout';


const AddAddress = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        document.title = 'Add delivery address';
    }, []);
    const [values, setValues] = useState({
        type: "",
        address1: "",
        landmark: "",
        city: "",
        state: "",
        zipcode: "",
        country: ""
    });


    const { type, address1, landmark, city, state, zipcode, country } = values;

    const handleChange = (data) =>
        (event) => {
            setValues({ ...values, [data]: event.target.value });

        };

        const onSubmit = async (event) => {
            event.preventDefault();
            setValues({ ...values });
        
            try {
                const resultAction = await dispatch(createAddress({ type, address1, landmark, city, state, zipcode, country }));
                const result = unwrapResult(resultAction);
                if (result && !result.errors) {
                    setValues({
                        type: "",
                        address1: "",
                        landmark: "",
                        city: "",
                        state: "",
                        zipcode: "",
                        country: ""
                    });
                    navigate('/user/profile');
                } else {
                    console.error('Failed to create address:', result);
                }
        
            } catch (error) {
                
                console.error('Error:', error);
               
            }
        };
        


    return (
        <Layout>
            <div className='w-1/2 mx-auto my-5 bg-blur bg-gray-100 rounded-lg'>
                <h1 className='text-gray-500 text-xl text-center font-bold mt-2'>Add Your Address</h1>
                <div className="flex justify-center py-10 items-center shadow-lg mx-auto ">
                    <form action="" className='bg-white p-3 rounded-lg'>
                        <div className='m-10'>
                            <p className='text-gray-400 font-italic mb-2'>Enter Your Address Details.</p>

                            <div className="flex items-center border-2 py-2 px-3 mb-4 rounded-2xl hover:outline-none hover:ring-2 hover:ring-orange-500">
                                <select
                                    id="type"
                                    name="type"
                                    value={type}
                                    onChange={handleChange("type")}
                                    className="w-full text-gray-500 px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                >
                                    <option value="" className='text-gray-500'>Type...</option>
                                    <option value="H">Home</option>
                                    <option value="C">Current</option>
                                    <option value="O">Other</option>
                                </select>
                            </div>

                            <div className="flex items-center border-2 py-2 px-3 mb-4 rounded-2xl hover:outline-none hover:ring-2 hover:ring-orange-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 384 512"><path fill="#808080" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" /></svg>
                                <input className="pl-2 outline-none border-none" type="text"
                                    name="address1" id="" placeholder="Street address / Building / House "
                                    value={address1}
                                    onChange={handleChange("address1")}
                                    required
                                />
                            </div>

                            <div className="flex items-center border-2 py-2 px-3 mb-4 rounded-2xl hover:outline-none hover:ring-2 hover:ring-orange-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 512 512"><path fill="#808080" d="M256 0c17.7 0 32 14.3 32 32V66.7C368.4 80.1 431.9 143.6 445.3 224H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H445.3C431.9 368.4 368.4 431.9 288 445.3V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V445.3C143.6 431.9 80.1 368.4 66.7 288H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H66.7C80.1 143.6 143.6 80.1 224 66.7V32c0-17.7 14.3-32 32-32zM128 256a128 128 0 1 0 256 0 128 128 0 1 0 -256 0zm128-80a80 80 0 1 1 0 160 80 80 0 1 1 0-160z" /></svg>
                                <input className="pl-2 outline-none border-none" type="text"
                                    name="landmark" id="" placeholder="LandMark"
                                    value={landmark}
                                    onChange={handleChange("landmark")}
                                    required
                                />

                            </div>

                            <div className="flex items-center border-2 py-2 px-3 mb-4 rounded-2xl hover:outline-none hover:ring-2 hover:ring-orange-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 640 512"><path fill="#808080" d="M480 48c0-26.5-21.5-48-48-48H336c-26.5 0-48 21.5-48 48V96H224V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V96H112V24c0-13.3-10.7-24-24-24S64 10.7 64 24V96H48C21.5 96 0 117.5 0 144v96V464c0 26.5 21.5 48 48 48H304h32 96H592c26.5 0 48-21.5 48-48V240c0-26.5-21.5-48-48-48H480V48zm96 320v32c0 8.8-7.2 16-16 16H528c-8.8 0-16-7.2-16-16V368c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16zM240 416H208c-8.8 0-16-7.2-16-16V368c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16zM128 400c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V368c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32zM560 256c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H528c-8.8 0-16-7.2-16-16V272c0-8.8 7.2-16 16-16h32zM256 176v32c0 8.8-7.2 16-16 16H208c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16zM112 160c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h32zM256 304c0 8.8-7.2 16-16 16H208c-8.8 0-16-7.2-16-16V272c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32zM112 320H80c-8.8 0-16-7.2-16-16V272c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16zm304-48v32c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16V272c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16zM400 64c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h32zm16 112v32c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16z" /></svg>
                                <input className="pl-2 outline-none border-none" type="text"
                                    name="city" id="" placeholder="City"
                                    value={city}
                                    onChange={handleChange("city")}
                                    required
                                />

                            </div>

                            <div className="flex items-center border-2 py-2 px-3 mb-4 rounded-2xl hover:outline-none hover:ring-2 hover:ring-orange-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 448 512"><path fill="#808080" d="M32 0C49.7 0 64 14.3 64 32V48l69-17.2c38.1-9.5 78.3-5.1 113.5 12.5c46.3 23.2 100.8 23.2 147.1 0l9.6-4.8C423.8 28.1 448 43.1 448 66.1v36.1l-44.7 16.2c-42.8 15.6-90 13.9-131.6-4.6l-16.1-7.2c-20.3-9-41.8-14.7-63.6-16.9v32.2c17.4 2.1 34.4 6.7 50.6 13.9l16.1 7.2c49.2 21.9 105 23.8 155.6 5.4L448 136.3v62l-44.7 16.2c-42.8 15.6-90 13.9-131.6-4.6l-16.1-7.2c-40.2-17.9-85-22.5-128.1-13.3L64 203.1v32.7l70.2-15.1c36.4-7.8 74.3-3.9 108.4 11.3l16.1 7.2c49.2 21.9 105 23.8 155.6 5.4L448 232.3v62l-44.7 16.2c-42.8 15.6-90 13.9-131.6-4.6l-16.1-7.2c-40.2-17.9-85-22.5-128.1-13.3L64 299.1v32.7l70.2-15.1c36.4-7.8 74.3-3.9 108.4 11.3l16.1 7.2c49.2 21.9 105 23.8 155.6 5.4L448 328.3v33.5c0 13.3-8.3 25.3-20.8 30l-34.7 13c-46.2 17.3-97.6 14.6-141.7-7.4c-37.9-19-81.3-23.7-122.5-13.4L64 400v80c0 17.7-14.3 32-32 32s-32-14.3-32-32V416 345.5 312.8 249.5 216.8 153.5 120.8 64 32C0 14.3 14.3 0 32 0zm80 96A16 16 0 1 0 80 96a16 16 0 1 0 32 0zm32 0a16 16 0 1 0 0-32 16 16 0 1 0 0 32zm-32 48a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm32 0a16 16 0 1 0 0-32 16 16 0 1 0 0 32z" /></svg>
                                <input className="pl-2 outline-none border-none" type="text"
                                    name="state" id="" placeholder="State"
                                    value={state}
                                    onChange={handleChange("state")}
                                    required
                                />

                            </div>
                            <div className="flex items-center border-2 py-2 px-3 mb-4 rounded-2xl hover:outline-none hover:ring-2 hover:ring-orange-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 512 512"><path fill="#808080" d="M215.7 499.2c11-13.8 25.1-31.7 40.3-52.3V352c0-23.7 12.9-44.4 32-55.4V272c0-55.6 40.5-101.7 93.6-110.5C367 70 287.7 0 192 0C86 0 0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM400 240c17.7 0 32 14.3 32 32v48H368V272c0-17.7 14.3-32 32-32zm-80 32v48c-17.7 0-32 14.3-32 32V480c0 17.7 14.3 32 32 32H480c17.7 0 32-14.3 32-32V352c0-17.7-14.3-32-32-32V272c0-44.2-35.8-80-80-80s-80 35.8-80 80z" /></svg>
                                <input className="pl-2 outline-none border-none" type="text"
                                    name="zipcode" id="" placeholder="Zip code / Pin code"
                                    value={zipcode}
                                    onChange={handleChange("zipcode")}
                                    required
                                />

                            </div>
                            <div className="flex items-center border-2 py-2 px-3 mb-4 rounded-2xl hover:outline-none hover:ring-2 hover:ring-orange-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 512 512"><path fill="#808080" d="M352 256c0 22.2-1.2 43.6-3.3 64H163.3c-2.2-20.4-3.3-41.8-3.3-64s1.2-43.6 3.3-64H348.7c2.2 20.4 3.3 41.8 3.3 64zm28.8-64H503.9c5.3 20.5 8.1 41.9 8.1 64s-2.8 43.5-8.1 64H380.8c2.1-20.6 3.2-42 3.2-64s-1.1-43.4-3.2-64zm112.6-32H376.7c-10-63.9-29.8-117.4-55.3-151.6c78.3 20.7 142 77.5 171.9 151.6zm-149.1 0H167.7c6.1-36.4 15.5-68.6 27-94.7c10.5-23.6 22.2-40.7 33.5-51.5C239.4 3.2 248.7 0 256 0s16.6 3.2 27.8 13.8c11.3 10.8 23 27.9 33.5 51.5c11.6 26 20.9 58.2 27 94.7zm-209 0H18.6C48.6 85.9 112.2 29.1 190.6 8.4C165.1 42.6 145.3 96.1 135.3 160zM8.1 192H131.2c-2.1 20.6-3.2 42-3.2 64s1.1 43.4 3.2 64H8.1C2.8 299.5 0 278.1 0 256s2.8-43.5 8.1-64zM194.7 446.6c-11.6-26-20.9-58.2-27-94.6H344.3c-6.1 36.4-15.5 68.6-27 94.6c-10.5 23.6-22.2 40.7-33.5 51.5C272.6 508.8 263.3 512 256 512s-16.6-3.2-27.8-13.8c-11.3-10.8-23-27.9-33.5-51.5zM135.3 352c10 63.9 29.8 117.4 55.3 151.6C112.2 482.9 48.6 426.1 18.6 352H135.3zm358.1 0c-30 74.1-93.6 130.9-171.9 151.6c25.5-34.2 45.2-87.7 55.3-151.6H493.4z" /></svg>
                                <input className="pl-2 outline-none border-none" type="text"
                                    name="country" id="" placeholder="Country"
                                    value={country}
                                    onChange={handleChange("country")}
                                    required
                                />

                            </div>
                        </div>

                        <div>
                            <button type="submit"
                                className="block w-full bg-orange-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 hover:bg-orange-700"
                                onClick={onSubmit}
                            > Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </Layout>
    )
}

export default AddAddress