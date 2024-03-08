import React, { useEffect, useState } from 'react'
import Layout from '../homepage/Layout'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { createDeliveryBoyAccount } from '../features/actions/deliveryBoyActions';

const CreateDeliveryBoy = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [step, setStep] = useState(1);

    const [values, setValues] = useState({
        DLNumber : "",
        panCardNumber : "",
        alternatePhone: "",
        aadharNumber: "",
        confirmAadharNumber: "",
        bankAccount: "",
        confirmBankAccount: "",
        bankIfscCode: "",
        confirmIfscCode: "",
        locality : "",
        city: "",
        state: "",
        zipcodes: "",
        
    });

    useEffect(() => {
        document.title = 'Create delivery boy account';
    }, []);
    const { DLNumber, panCardNumber, alternatePhone, aadharNumber, confirmAadharNumber, bankAccount, confirmBankAccount, bankIfscCode, confirmIfscCode, locality, city, state, zipcodes } = values;

    const handleChange = (data) =>
        (event) => {
            setValues({ ...values, [data]: event.target.value });

        };


    const onSubmit = async (event) => {
        event.preventDefault();
        setValues({ ...values });
     
        const resultAction = await dispatch(createDeliveryBoyAccount({ DLNumber, panCardNumber, alternatePhone, aadharNumber, confirmAadharNumber, bankAccount, confirmBankAccount, bankIfscCode, confirmIfscCode, locality, city, state, zipcodes}));
        const result = unwrapResult(resultAction);
      
        if (!result.errors) {
            Swal.fire({
                icon: 'success',
                title: 'Congrats! You are now a Delivery Partner of Bewra.',
                text: result.msg + " \nSave Note down your ID " + result.data.delivery_boy_id,
            });
            setValues({
                ...values,
                DLNumber: "",
                panCardNumber: "",
                alternatePhone: "",
                aadharNumber: "",
                confirmAadharNumber: "",
                bankAccount: "",
                confirmBankAccount: "",
                bankIfscCode: "",
                confirmIfscCode: "",
                locality: "",
                city: "",
                state: "",
                zipcodes: "",
            });
            navigate('/user/profile')
        }
        else {
            const errorFields = Object.keys(result.errors);
            const errorMessage = errorFields.map(field => `${field}: ${result.errors[field][0]}`).join('\n');
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong!.',
                text: errorMessage,
            });
            setValues({
                ...values,
            });
        }

    }

    const nextStep = () => {
        if (step < 3) {
            setStep(step + 1);
        }
        else {
            setStep(step);
        }
    }

    const prevStep = () => {
        if (step > 1) {
            setStep(step - 1)
        }
        else {
            setStep(step);
        }
    }
    return (
        <Layout>
            <div className='bg-gray-100 h-100 w-3/4 mx-auto bg-blur rounded-lg'>
                <div className="flex justify-center py-10 items-center shadow-lg mx-auto ">
                    <form className="bg-white p-3 rounded-lg" >
                        <h1 className="text-center text-orange-800 font-bold text-2xl mb-5 my-auto">Become a Delivery Partner!</h1>
                        <hr />
                        {step ===1 && (
                            <div className='items-center m-10'>
                                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-5 hover:outline-none hover:ring-2 hover:ring-orange-500">

                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 576 512"><path fill="currentColor" fillRule="evenodd" d="M547.6 103.8L490.3 13.1C485.2 5 476.1 0 466.4 0H109.6C99.9 0 90.8 5 85.7 13.1L28.3 103.8c-29.6 46.8-3.4 111.9 51.9 119.4c4 .5 8.1 .8 12.1 .8c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.1 0 49.3-11.4 65.2-29c15.9 17.6 39.1 29 65.2 29c26.2 0 49.3-11.4 65.2-29c16 17.6 39.1 29 65.2 29c4.1 0 8.1-.3 12.1-.8c55.5-7.4 81.8-72.5 52.1-119.4zM499.7 254.9l-.1 0c-5.3 .7-10.7 1.1-16.2 1.1c-12.4 0-24.3-1.9-35.4-5.3V384H128V250.6c-11.2 3.5-23.2 5.4-35.6 5.4c-5.5 0-11-.4-16.3-1.1l-.1 0c-4.1-.6-8.1-1.3-12-2.3V384v64c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V384 252.6c-4 1-8 1.8-12.3 2.3z" /></svg>
                                    <input className="pl-2 outline-none border-none"
                                        type="text" name="DLNumber" placeholder="Enter Driving Licence number"
                                        value={DLNumber}
                                        onChange={handleChange("DLNumber")}
                                        required
                                    />
                                </div>

                                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 hover:outline-none hover:ring-2 hover:ring-orange-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className='h-5 w-5 text-gray-400' viewBox="0 0 576 512"><path fill="#808080" fillRule="evenodd" d="M0 96l576 0c0-35.3-28.7-64-64-64H64C28.7 32 0 60.7 0 96zm0 32V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128H0zM64 405.3c0-29.5 23.9-53.3 53.3-53.3H234.7c29.5 0 53.3 23.9 53.3 53.3c0 5.9-4.8 10.7-10.7 10.7H74.7c-5.9 0-10.7-4.8-10.7-10.7zM176 192a64 64 0 1 1 0 128 64 64 0 1 1 0-128zm176 16c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16z" /></svg>
                                    <input className="pl-2 outline-none border-none"
                                        type="text" name="panCardNumber"
                                        placeholder="Enter Pan Card Number"
                                        value={panCardNumber}
                                        onChange={handleChange("panCardNumber")}
                                        required
                                    />
                                </div>
                                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-10 hover:outline-none hover:ring-2 hover:ring-orange-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 512 512"><path fill="#808080" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" /></svg>
                                    <input className="pl-2 outline-none border-none"
                                        type="text" name="alternatePhone" id=""
                                        placeholder="Phone"
                                        value={alternatePhone}
                                        onChange={handleChange("alternatePhone")}
                                        required
                                    />
                                </div>
                            </div>
                        )}
                        {step === 2 && (
                            <div className='m-10'>
                                <div className="flex items-center border-2 py-2 px-3 rounded-2xl mb-4 hover:outline-none hover:ring-2 hover:ring-orange-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                                    </svg>
                                    <input className="pl-2 outline-none border-none"
                                        type="text" name="aadharNumber" id=""
                                        placeholder="Aadhar Number"
                                        value={aadharNumber}
                                        onChange={handleChange("aadharNumber")}
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
                                        type="text" name="confirmAadharNumber" id=""
                                        placeholder="Confirm Aadhar Number"
                                        value={confirmAadharNumber}
                                        onChange={handleChange("confirmAadharNumber")}
                                        required
                                    />
                                </div>

                                <div className="flex items-center border-2 py-2 px-3 mb-4 rounded-2xl hover:outline-none hover:ring-2 hover:ring-orange-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 512 512"><path fill="#808080" d="M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160v8c0 13.3 10.7 24 24 24H456c13.3 0 24-10.7 24-24v-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224H64V420.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512H480c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1V224H384V416H344V224H280V416H232V224H168V416H128V224zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>
                                    <input className="pl-2 outline-none border-none"
                                        type="text" name="bankAccount" id=""
                                        placeholder="Bank Account"
                                        value={bankAccount}
                                        onChange={handleChange("bankAccount")}
                                        required
                                    />
                                </div>
                                <div className="flex items-center border-2 py-2 px-3 mb-4 rounded-2xl hover:outline-none hover:ring-2 hover:ring-orange-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 512 512"><path fill="#808080" d="M243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160v8c0 13.3 10.7 24 24 24H456c13.3 0 24-10.7 24-24v-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8-3.4-17.2-3.4-25.2 0zM128 224H64V420.3c-.6 .3-1.2 .7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512H480c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1V224H384V416H344V224H280V416H232V224H168V416H128V224zM256 64a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" /></svg>
                                    <input className="pl-2 outline-none border-none" type="text"
                                        name="confirmBankAccount" id="" placeholder="Confirm Bank Account"
                                        value={confirmBankAccount}
                                        onChange={handleChange("confirmBankAccount")}
                                        required
                                    />

                                </div>


                                <div className="flex items-center border-2 py-2 px-3 mb-4 rounded-2xl hover:outline-none hover:ring-2 hover:ring-orange-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 576 512"><path fill="#808080" d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm48 160H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zM96 336c0-8.8 7.2-16 16-16H464c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16zM376 160h80c13.3 0 24 10.7 24 24v48c0 13.3-10.7 24-24 24H376c-13.3 0-24-10.7-24-24V184c0-13.3 10.7-24 24-24z" /></svg>
                                    <input className="pl-2 outline-none border-none" type="text"
                                        name="bankIfscCode" id="" placeholder="Enter bank IFSC Code"
                                        value={bankIfscCode}
                                        onChange={handleChange("bankIfscCode")}
                                        required
                                    />

                                </div>
                                <div className="flex items-center border-2 py-2 px-3 mb-4 rounded-2xl hover:outline-none hover:ring-2 hover:ring-orange-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 576 512"><path fill="#808080" d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm48 160H272c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16zM96 336c0-8.8 7.2-16 16-16H464c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16zM376 160h80c13.3 0 24 10.7 24 24v48c0 13.3-10.7 24-24 24H376c-13.3 0-24-10.7-24-24V184c0-13.3 10.7-24 24-24z" /></svg>
                                    <input className="pl-2 outline-none border-none" type="text"
                                        name="confirmIfscCode" id="" placeholder="Confirm Bank IFSC Code"
                                        value={confirmIfscCode}
                                        onChange={handleChange("confirmIfscCode")}
                                        required
                                    />

                                </div>
                            </div>
                        )}
                        {step === 3 && (


                            <div className='m-10'>
                                <p className='text-gray-400 font-italic mb-2'>Enter Possible Delivery Area Details.**</p>
                                <small>Enter upto 5 local area name eg.(street No. 1, street No. 2, st. No. 3, st. No. 4, st.No. 5)</small>
                                <div className="flex items-center border-2 py-2 px-3 mb-4 rounded-2xl hover:outline-none hover:ring-2 hover:ring-orange-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 384 512"><path fill="#808080" d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" /></svg>
                                    <input className="pl-2 outline-none border-none" type="text"
                                        name="locality" id="" placeholder="Enter Locality"
                                        value={locality}
                                        onChange={handleChange("locality")}
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
                                        name="zipcodes" placeholder="Zip code / Pin code"
                                        value={zipcodes}
                                        onChange={handleChange("zipcodes")}
                                        required
                                    />

                                </div>
                               
                                <div className="flex items-start m-2">
                                    <div className="flex items-center h-5">
                                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                                    </div>
                                    <label for="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-400">I agree with the <a href="/" className="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
                                </div>
                            </div>
                        )}
                        {/* Previous button */}
                        {step > 1 && (
                            <button type="submit"
                                className="block w-full bg-gray-900 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 hover:bg-gray-800"
                                onClick={prevStep}
                            ><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white justify-start inline " viewBox="0 0 448 512"><path fill="#808080" d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" /></svg>
                                Prev
                            </button>
                        )}
                        {/* Next button */}
                        {step < 3 && (
                            <button type="submit"
                                className="block w-full mt-4 py-2 rounded-2xl text-white font-semibold mb-2 bg-gray-500 hover:bg-gray-600"
                                onClick={nextStep}
                            >Next <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline" viewBox="0 0 448 512"><path fill="#fff" d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" /></svg>

                            </button>
                        )}
                        {step === 3 && (
                            <button type="submit"
                                className="block w-full bg-orange-600 mt-4 py-2 rounded-2xl text-white font-semibold mb-2 hover:bg-orange-700"
                                onClick={onSubmit}
                            >Create Delivery Boy Account
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default CreateDeliveryBoy;