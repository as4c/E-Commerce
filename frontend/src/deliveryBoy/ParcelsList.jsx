import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../homepage/Layout';
import { getAllParcels } from '../features/actions/deliveryBoyActions';
import { Watch } from 'react-loader-spinner';
import { filterOrder } from '../features/actions/orderActions';
import FilterPage from '../helper/FilterPage';
import DisplayOrderList from '../helper/DisplayOrderList';


const ParcelsList = () => {
    const dispatch = useDispatch();
    const [type, setType] = useState('')
    const [value, setValues] = useState('')
    useEffect(() => {
        document.title = 'Parcel lists';
    }, []);
    useEffect(() => {
        const filterData = (type, value) => {
            if (value === "") {
                dispatch(getAllParcels());
            } else {
                dispatch(filterOrder({ type: type, value: value }));
            }
        };
        filterData(type, value);
    }, [dispatch, type, value])

   
    const {order_list , delivery_boy_loading} = useSelector((state)=> state.deliveryBoy);

    if(delivery_boy_loading){
        return (
            <div className="flex flex-col justify-center mx-auto min-h-screen">
              <Watch
                visible={true}
                height="80"
                width="80"
                radius="48"
                color="#4fa94d"
                ariaLabel="watch-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
        )
    }

    return (
        <Layout>
            <div className="bg-white">
                <div className="pb-3 mb-5">
                    <h1 className="text-center align-center text-3xl font-bold text-gray-800">Parcels</h1>
                </div>
                <hr />
                <FilterPage setType={setType} setValues={setValues} />
                {order_list.orders && order_list.orders.length > 0 ? (
                    <div>
                        <DisplayOrderList  data = {order_list.orders}/>
                    </div>

                )
                    :
                    (
                        <div className="pb-3 mb-5 min-h-screen">
                            <h1 className="text-center align-center text-3xl font-bold text-gray-800">Parcels not found!</h1>
                        </div>
                    )
                }

            </div>
        </Layout >

    )
}

export default ParcelsList;