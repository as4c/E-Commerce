import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../homepage/Layout';
import { loadDashboard } from '../features/actions/sellerActions';
import Loading from '../helper/Loading';
import { formateDate } from '../helper';

const SellerDashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, sellers, sellerAuthenticated } = useSelector((state) => state.seller);
    const { user } = useSelector((state) => state.auth);
    useEffect(() => {
        const fetchData = async () => {
            if (!sellerAuthenticated || sellers.length === 0) {
                navigate('/user/seller/login')
            }
            dispatch(loadDashboard());

        };

        fetchData();
    }, [dispatch]);

    useEffect(() => {
        document.title = 'Seller dashboard';
    }, []);

    if (loading || !sellers.owner) {
        return (
            <Loading />
        )
    }


    return (
        <Layout>
            <div className="bg-gray-100">
                <div class="container mx-auto p-5">
                    <div class="md:flex no-wrap mx-2 px-3">
                        {/* <!-- Left Side --> */}
                        {user.is_vendor ?
                            <div class="w-full md:w-3/12 md:mx-2">
                                <div class="bg-gray-200 p-3 hover:shadow hidden md:inline">
                                    <div className="grid grid-cols-1 ">
                                        <ul>
                                            <li className="mb-1">
                                                <a className="block p-4 text-sm font-semibold text-gray-800 hover:bg-orange-50 hover:text-orange-600 rounded " href="/user/seller/your-product">Your Products </a>
                                            </li>

                                            <li className="mb-1">
                                                <a className="block p-4 text-sm font-semibold text-gray-800 hover:bg-orange-50 hover:text-orange-600 rounded " href="/user/seller/add-product">Add Products </a>
                                            </li>

                                            <li className="mb-1">
                                                <a className="block p-4 text-sm font-semibold text-gray-800 hover:bg-orange-50 hover:text-orange-600 rounded " href="/user/seller/add-category">Add Categories </a>
                                            </li>

                                            <li className="mb-1">
                                                <a className="block p-4 text-sm font-semibold text-gray-800 hover:bg-orange-50 hover:text-orange-600 rounded " href="/user/seller/sells">Your Sells</a>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                            </div>
                            :
                            (" ")
                        }
                        {/* <!-- Right Side --> */}
                        <div class="w-full md:w-9/12 mx-2">
                            {/* <!-- About Section --> */}
                            <div class="bg-white p-3 shadow-sm rounded-sm">
                                <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                    <span clas="text-green-500">
                                        <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </span>
                                    <span class="tracking-wide">Account info</span>
                                </div>
                                <div class="text-gray-700">

                                    <div class="grid md:grid-cols-2 text-sm">
                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Shop Name</div>
                                            <div class="px-4 py-2">{sellers.shop_name}</div>
                                        </div>
                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Shop ID</div>
                                            <div class="px-4 py-2">{sellers.vendor_id}</div>
                                        </div>
                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Owner Name</div>
                                            <div class="px-4 py-2">{sellers.owner.first_name}  {sellers.owner.last_name}</div>
                                        </div>
                                        <div class=" grid grid-cols-2 mr-2">
                                            <div class="px-4 py-2 font-semibold">Owner Email.</div>
                                            <div class="px-2 py-2">
                                                <a class="text-blue-800 mr-2" href={`mailto:${sellers.owner.email}`}>{sellers.owner.email}</a>

                                            </div>
                                        </div>


                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">GST Number</div>
                                            <div class="px-4 py-2">{sellers.gst_number}</div>
                                        </div>

                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Owner Aadhar Number</div>
                                            <div class="px-4 py-2">{sellers.aadhar_number}</div>
                                        </div>
                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Bank Account Number</div>
                                            <div class="px-4 py-2">{sellers.bank_account}</div>
                                        </div>
                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Bank ifsc code</div>
                                            <div class="px-4 py-2">{sellers.bank_ifsc_code}</div>
                                        </div>
                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Contact No.</div>
                                            <div class="px-4 py-2">+91 {sellers.owner.phone}</div>
                                        </div>
                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Alternate phone</div>
                                            <div class="px-4 py-2">+91 {sellers.alternate_phone}</div>
                                        </div>

                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Created at</div>
                                            <div class="px-4 py-2">{formateDate(sellers.created_at)}</div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            
                            <div class="my-4"></div>
                            <div class="bg-white p-3 shadow-sm rounded-sm my-2">

                                <div class="grid grid-cols-1">
                                    <div>
                                        <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                            <span clas="text-green-500">
                                                <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                    stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </span>
                                            <span class="tracking-wide">Address</span>
                                        </div>
                                        <ul class="list-inside space-y-2">
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold text-gray-800">Street / House No. / Building name</div>
                                                <div class="px-4 py-2">{sellers.address1}</div>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold text-gray-800">Landmark</div>
                                                <div class="px-4 py-2">{sellers.landmark}</div>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold text-gray-800">City</div>
                                                <div class="px-4 py-2">{sellers.city}</div>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold text-gray-800">State </div>
                                                <div class="px-4 py-2">{sellers.state}</div>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold text-gray-800">Country </div>
                                                <div class="px-4 py-2">{sellers.country}</div>
                                            </div>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                            <div className='bg-white p-3 shadow-sm rounded-sm my-2'>
                                <h1 className='text-xl text-gray-600 text-center font-semibold '>Sells detail</h1>
                                <div className="grid grid-cols-1">
                                    <div class="grid grid-cols-2">
                                        <div class="px-4 py-2 font-semibold">Total product</div>
                                        <div class="px-4 py-2">{sellers.total_product}</div>
                                    </div>
                                    <div class="grid grid-cols-2">
                                        <div class="px-4 py-2 font-semibold">Today sells</div>
                                        <div class="px-4 py-2"> 10 </div>
                                    </div>
                                    <div class="grid grid-cols-2">
                                        <div class="px-4 py-2 font-semibold">Total sales</div>
                                        <div class="px-4 py-2">{sellers.total_sales}</div>
                                    </div>
                                    <div class="grid grid-cols-2">
                                        <div class="px-4 py-2 font-semibold">Total Earning</div>
                                        <div class="px-4 py-2">{sellers.total_payment}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default SellerDashboard