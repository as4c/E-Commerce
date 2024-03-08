import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadAddress } from '../../features/actions/addressAction';
import { Link, useNavigate } from 'react-router-dom';
import SelectPayment from './SelectPayment';
import { mapAddressCodeToLabel } from '../../helper';

const SelectAddress = ({addres, handleSetAddress, payment, setPayment}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { address } = useSelector((state) => state.address);
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        document.title = 'Select Address';
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (isAuthenticated) {
                dispatch(loadAddress());
            } else {
                return navigate('/signin');
            }
        };

        fetchData();
    }, [isAuthenticated, dispatch]);


    const onSelectAddress = (uid) => {
        handleSetAddress(uid);
    }
    const hideAddress = () =>{
        let addresscontainer = document.getElementById('address');
        addresscontainer.hidden =true; 
    }
    return (
        <div className='container my-10 flex flex-col justify-center items-center'>
            <title>Select Address</title>
            <div className="pb-3 mb-5">
                <h1 className="text-center align-center text-3xl font-bold text-gray-800">Select Address</h1>
            </div>
            <div className="bg-white p-3 shadow-sm rounded-sm" id='address'>
                <div className="grid grid-cols-1">
                    {address.length > 0 ? (
                        address.map((address) => (
                            <div key={address.uid} className='bg-gray-100 m-1'>
                                <ul className="list-inside space-y-2  ">
                                    <div className="flex flex-row justify-between px-4 py-2 text-gray-800">
                                        <button className='mr-5 block font-semibold text-center'>{mapAddressCodeToLabel(address.type)} Address</button>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold text-gray-400">Street / House No. / Building name</div>
                                        <div className="px-4 py-2">{address.address1}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold text-gray-400">Landmark</div>
                                        <div className="px-4 py-2">{address.landmark}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold text-gray-400">City</div>
                                        <div className="px-4 py-2">{address.city}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold text-gray-400">State </div>
                                        <div className="px-4 py-2">{address.state}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold text-gray-400">
                                            Zipcode
                                        </div>
                                        <div className="px-4 py-2">{address.zipcode}</div>
                                    </div>

                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold text-gray-400">Country </div>
                                        <div className="px-4 py-2">{address.country}</div>
                                    </div>
                                </ul>
                                <div className="py-2 text-gray-800 flex justify-end">
                                    <Link to={`/user/update-address/${address.uid}`} className='mx-5 bg-green-500 hover:bg-green-600 py-1.5 px-4 font-semibold text-gray-200 rounded-lg'>Edit</Link>
                                    <button onClick={() => { onSelectAddress(address.uid); hideAddress(); }} className='ml-5 bg-orange-500 hover:bg-orange-600 py-1.5 px-4 font-semibold text-gray-200 rounded-lg'>Deliver to this address</button>

                                </div>
                            </div>
                        ))
                    ) : (
                        // If there are no addresses, render a link to add a new address
                        <Link to={`/user/create-address`} className='bg-blue-500 hover:bg-blue-600 py-2 px-3 m-1 rounded-lg font-semibold'>Add Address</Link>
                    )}
                </div>
                {address.length > 0 ? (
                    <div className='mt-1 text-end'>
                        <Link to={`/user/create-address`} className='bg-blue-500 hover:bg-blue-600 py-2 px-3 m-1 rounded-lg font-semibold'>
                            + Add Another Address
                        </Link>
                    </div>
                ) :
                    ""
                }
            </div>
            <div className="hidden">
                <SelectPayment payment={payment} setPayment={setPayment} />
            </div>
        </div>

    )
}

export default SelectAddress;