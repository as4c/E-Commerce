import React, {useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadAllProduct } from '../features/actions/productActions';
import Loading from '../helper/Loading';
import ProductList from './ProductList';
import { pageDecrement } from './service';
import ProductFilter from '../helper/ProductFilter';


const GetAllProducts = () => {
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();
    const { loading, data } = useSelector((state) => state.product);
    useEffect(() => {
        document.title = 'Homepage';
    }, []);
    useEffect(() => {
        dispatch(loadAllProduct(page));
    }, [dispatch, page])

    if (loading) {
        return (
            <Loading />
        )
    }
    return (
        <div className=''>  
            <div className="py-5 bg-white">
                <h1 className="text-center text-2xl font-bold text-gray-800">All Products</h1>
            </div>
            <ProductFilter/>
            <ProductList data={data} />
            <div className='bg-white'>
                <div className='flex flex-row justify-center items-center shadow-sm p-2 rounded-lg'>
                    <button className='text-xl font-bold py-1 px-1 border-r-2 border-gray-500 bg-gray-300' onClick={()=> setPage(pageDecrement(page))}>Previous</button>
                    <button className='text-xl font-bold py-1 px-5 border-r-2 border-gray-500 bg-gray-300'>{page}</button>
                    <button className='text-xl font-bold py-1 px-1 bg-gray-300' onClick={()=> setPage(page+1)}>Next</button>
                </div>
            </div>

        </div>
    )
}

export default GetAllProducts;