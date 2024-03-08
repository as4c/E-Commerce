import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../homepage/Layout';
import { laodProfile } from '../features/actions/authActions';
import { deleteAddress, loadAddress } from '../features/actions/addressAction';
import { BaseUrl } from '../backend';
import { formateDate, mapAddressCodeToLabel, mapGenderCodeToLabel } from '../helper';

const Profile = () => {
    const [del, setDel] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, isAuthenticated, user } = useSelector((state) => state.auth);
    const { address } = useSelector((state) => state.address);
    const { sellerAuthenticated } = useSelector((state) => state.seller);
    const { deliveryBoyAuthenticated } = useSelector((state) => state.deliveryBoy);
    useEffect(() => {
        document.title = `${user.username} - profile`;
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (isAuthenticated) {
                dispatch(laodProfile());
                dispatch(loadAddress());
            } else {
                return navigate('/signin');
            }
        };

        fetchData();
    }, [isAuthenticated, dispatch, del]);

    if (loading) {
        return (<h1>Loading ...</h1>)
    }

    if (!isAuthenticated) {
        return (<h1>You are not authenticated user! <Link to={'/signin'}>Login Now</Link></h1>)
    }

    const onDelete = (uid) => {
        dispatch(deleteAddress({ uid }));
        setDel(del + 1);
    }

    return (
        <Layout>
            <div className="bg-gray-100">
                <div className="container mx-auto p-5 ">
                    <div className="md:flex no-wrap md:-mx-2 ">
                        {/* <!-- Left Side --> */}
                        <div className="w-full md:w-3/12 md:mx-2 bg-gray-200">
                            {/* <!-- Profile Card --> */}
                            <div className="flex justify-center p-3 border-t-4 border-green-400">
                                <div className="image overflow-hidden text-center">
                                    {/* src={`${BaseUrl}/${user.profile_pic}`} */}
                                    {user.profile_pic ? (
                                        // src="https://lavinephotography.com.au/wp-content/uploads/2022/09/Fam_Kids024-1.jpg" 
                                        <img src={`${user.profile_pic}`} alt="Profile"
                                            className='w-40 h-40 mx-auto rounded-full'
                                        />
                                    ) : (
                                        <img
                                            className="h-40 w-40 mx-auto rounded-full"
                                            src="https://lavinephotography.com.au/wp-content/uploads/2022/09/Fam_Kids024-1.jpg"
                                            alt="profile"
                                        />
                                    )}
                                </div>
                            </div>
                          
                            <div className=" p-3 text-gray-800">
                                <div className="flex items-center space-x-3 font-semibold text-white text-xl leading-8">
                                    <ul className=''>
                                        
                                        <li className="mb-1">
                                            <Link to={'/user/orders'} className="block p-4 text-sm font-semibold text-gray-800 hover:bg-orange-50 hover:text-orange-600 rounded" >Orders</Link>
                                        </li>

                                        {user.is_vendor ?
                                            (

                                                !sellerAuthenticated ?
                                                    (
                                                        <li className="mb-1">
                                                            <Link to='/user/seller/login' className="block p-4 text-sm font-semibold text-gray-800 hover:bg-orange-50 hover:text-orange-600 rounded " href="/user/seller/dashboard">Login seller Account</Link>
                                                        </li>
                                                    )
                                                    :
                                                    (
                                                        <>
                                                            <li className="mb-1">
                                                                <a className="block p-4 text-sm font-semibold text-gray-800 hover:bg-orange-50 hover:text-orange-600 rounded " href="/user/seller/dashboard">Seller Dashboard</a>
                                                            </li>
                                                            <li className="mb-1">
                                                                <a className="block p-4 text-sm font-semibold text-gray-800 hover:bg-orange-50 hover:text-orange-600 rounded " href="/user/seller/sells">Sells</a>
                                                            </li>
                                                        </>
                                                    )

                                            )
                                            :
                                            user.is_delivery_boy ?

                                                (
                                                    !deliveryBoyAuthenticated ?
                                                        (
                                                            <li className="mb-1">
                                                                <a className="block p-4 text-sm font-semibold text-gray-800 hover:bg-orange-50 hover:text-orange-600 rounded " href="/user/deliveryboy/login">Login Delivery Boy </a>
                                                            </li>
                                                        ) :
                                                        <>
                                                            <li className="mb-1">
                                                                <a className="block p-4 text-sm font-semibold text-gray-400 hover:bg-orange-50 hover:text-orange-600 rounded " href="/user/deliveryboy/dashboard">Delivery Dashboard</a>
                                                            </li>
                                                        </>
                                                )
                                                :
                                                (" ")
                                        }

                                        <li className="mb-1">
                                            <Link className="block p-4 text-sm font-semibold text-gray-800 hover:bg-orange-50 hover:text-orange-600 rounded " to="/account/settings">Settings</Link>
                                        </li>
                                    </ul>

                                </div>

                            </div>

                        </div>
                        {/* <!-- Right Side --> */}
                        <div className="w-full md:w-9/12 mx-2">

                            <div className="bg-white p-3 shadow-sm rounded-sm">
                                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                    <span clas="text-green-500">
                                        <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </span>
                                    <span className="tracking-wide">Account Info</span>
                                </div>
                                <div className="text-gray-700">
                                    <div className="grid md:grid-cols-2 text-sm">
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">First Name</div>
                                            <div className="px-4 py-2">{user.first_name}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Last Name</div>
                                            <div className="px-4 py-2">{user.last_name}</div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Gender</div>
                                            <div className="px-4 py-2">{mapGenderCodeToLabel(user.gender)}</div>
                                        </div>

                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Joined on</div>
                                            <div className="px-4 py-2">{formateDate(user.created_at)}</div>
                                        </div>

                                        <div className=" grid grid-cols-2 mr-2">
                                            <div className="px-4 py-2 font-semibold">Email.</div>
                                            <div className="px-2 py-2">
                                                <a className="text-blue-800 mr-2 whitespace-normal" href="mailto:jane@example.com">{user.email}</a>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2">
                                            <div className="px-4 py-2 font-semibold">Contact No.</div>
                                            <div className="px-4 py-2">+91 {user.phone}</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            {/* <!-- End of about section --> */}
                            <div className="my-4"></div>

                            <div className="bg-white p-3 shadow-sm rounded-sm">
                                <div className={`grid ${address.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                                    {address.length > 0 ? (
                                        address.map((address) => (
                                            <div key={address.uid} className='bg-gray-100 m-1'>
                                                <ul className="list-inside space-y-2  ">
                                                    <div className="">
                                                        <div className="flex flex-row justify-between px-4 py-2 text-gray-800">
                                                            <button className='mr-5 inline-block font-semibold'>{mapAddressCodeToLabel(address.type)} Address</button>
                                                            <Link to={`/user/update-address/${address.uid}`} className='mx-5 bg-green-500 hover:bg-green-600 py-1 px-3 font-semibold text-gray-200 rounded-md'>Update</Link>
                                                            <button onClick={() => onDelete(address.uid)} className='ml-5 bg-red-500 hover:bg-red-600 py-1 px-3 font-semibold text-gray-200 rounded-md'>Delete</button>
                                                        </div>
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
                                            </div>
                                        ))
                                    ) : (
                                        // If there are no addresses, render a link to add a new address
                                        <Link to={`/user/create-address`} className='bg-blue-500 hover:bg-blue-600 py-2 px-3 m-1 rounded-lg font-semibold'>Add Address</Link>
                                    )}
                                </div>
                                {address.length > 0 ? (
                                    <div className='mt-1'>
                                        <Link to={`/user/create-address`} className='bg-blue-500 hover:bg-blue-600 py-2 px-3 m-1 rounded-lg font-semibold'>
                                            + Add More
                                        </Link>
                                    </div>
                                ) :
                                    ""
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Layout >
    )
}

export default Profile;
