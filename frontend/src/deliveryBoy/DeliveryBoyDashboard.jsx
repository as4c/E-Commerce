import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import Layout from '../homepage/Layout';

const DeliveryBoyDashboard = () => {
    const { deliveryBoyData } = useSelector((state) => state.deliveryBoy);
    const { user } = useSelector((state) => state.auth);
    useEffect(() => {
        document.title = 'Delivery boy profile';
    }, []);
    return (
        <Layout>
            <div className="bg-gray-100">
                <div class="container mx-auto p-5">
                    <div class="md:flex no-wrap mx-2 px-3">
                        {/* <!-- Left Side --> */}
                        {user.is_delivery_boy ?
                            <div class="w-full md:w-3/12 md:mx-2 bg-gray-200">
                                <div class="p-3 hover:shadow hidden md:inline">
                                    <div className="grid grid-cols-1 ">
                                        <ul>
                                            <li className="mb-1 text-gray-800">
                                                <a className="block p-4 text-md font-semibold text-gray-800 hover:bg-orange-50 hover:text-orange-600 rounded " href="/user/deliveryboy/parcel-list"> Parcel list </a>
                                            </li>

                                            <li className="mb-1">
                                                <a className="block p-4 text-md font-semibold text-gray-800 hover:bg-orange-50 hover:text-orange-600 rounded " href="/user/deliveryboy/parcel-list"> Settings </a>

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
                                            <div class="px-4 py-2 font-semibold">Name</div>
                                            <div class="px-4 py-2">{user.first_name} {user.last_name}</div>
                                        </div>
                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Boy ID</div>
                                            <div class="px-4 py-2">{deliveryBoyData.delivery_boy_id}</div>
                                        </div>

                                        <div class=" grid grid-cols-2 mr-2">
                                            <div class="px-4 py-2 font-semibold">Email.</div>
                                            <div class="px-2 py-2">
                                                <a class="text-blue-800 mr-2" href={`mailto:${user.email}`}>{user.email}</a>
                                            </div>
                                        </div>


                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Drivery Licence</div>
                                            <div class="px-4 py-2">{deliveryBoyData.dl_number}</div>
                                        </div>

                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Pan Card Number</div>
                                            <div class="px-4 py-2">{deliveryBoyData.pan_card_number}</div>
                                        </div>

                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Aadhar Number</div>
                                            <div class="px-4 py-2">{deliveryBoyData.aadhar_number}</div>
                                        </div>
                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Bank Account Number</div>
                                            <div class="px-4 py-2">{deliveryBoyData.bank_account}</div>
                                        </div>
                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Bank ifsc code</div>
                                            <div class="px-4 py-2">{deliveryBoyData.bank_ifsc_code}</div>
                                        </div>
                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Contact No.</div>
                                            <div class="px-4 py-2">+91 {user.phone}</div>
                                        </div>
                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Alternate phone</div>
                                            <div class="px-4 py-2">+91 {deliveryBoyData.alternate_phone}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- End of about section --> */}
                            <div class="my-4"></div>

                            {/* <!-- Experience and education --> */}
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
                                            <span class="tracking-wide">Delivery Area</span>
                                        </div>
                                        <ul class="list-inside space-y-2">
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold text-gray-400">Locality</div>
                                                <div class="px-4 py-2">{deliveryBoyData.locality}</div>
                                            </div>

                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold text-gray-400">City</div>
                                                <div class="px-4 py-2">{deliveryBoyData.city}</div>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold text-gray-400">State </div>
                                                <div class="px-4 py-2">{deliveryBoyData.state}</div>
                                            </div>
                                            <div class="grid grid-cols-2">
                                                <div class="px-4 py-2 font-semibold text-gray-400">Zipcode </div>
                                                <div class="px-4 py-2">{deliveryBoyData.zipcodes}</div>
                                            </div>
                                        </ul>
                                    </div>

                                </div>
                            </div>
                           
                            <div className='bg-white p-3 shadow-sm rounded-sm my-2'>
                                <h1 className='text-xl text-gray-600 text-center font-semibold '>Earning detail</h1>
                                <div className="grid grid-cols-1">
                                    <div class="grid grid-cols-2">
                                        <div class="px-4 py-2 font-semibold">Current parcel</div>
                                        <div class="px-4 py-2">{deliveryBoyData.curr_parcel_cnt}</div>
                                    </div>
                                    <div class="grid grid-cols-2">
                                        <div class="px-4 py-2 font-semibold">Today delivered parcels</div>
                                        <div class="px-4 py-2"> {deliveryBoyData.daily_delivered} </div>
                                    </div>
                                    <div class="grid grid-cols-2">
                                        <div class="px-4 py-2 font-semibold">Total delivered parcels</div>
                                        <div class="px-4 py-2">{deliveryBoyData.total_delivered}</div>
                                    </div>
                                    <div class="grid grid-cols-2">
                                        <div class="px-4 py-2 font-semibold">Total Earning</div>
                                        <div class="px-4 py-2">{deliveryBoyData.total_payment}</div>
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

export default DeliveryBoyDashboard