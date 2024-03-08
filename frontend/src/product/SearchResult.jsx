import React, { useEffect, useState } from 'react'
import Layout from '../homepage/Layout'
import ProductList from './ProductList'
import { useDispatch, useSelector } from 'react-redux'
import { searchProduct } from '../features/actions/productActions'
import { useParams } from 'react-router-dom'
import Loading from '../helper/Loading'
import { pageDecrement } from './service'

const SearchResult = () => {
    const [page, setPage] = useState(1);
    const { query } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        document.title = 'Product search results';
    }, []);
    useEffect(() => {
        dispatch(searchProduct(query));
    }, [query, dispatch])

    const { data, loading } = useSelector((state) => state.product);
    if (loading) {
        return (
            <Loading />
        )
    }
    return (
        <Layout>
            <div className="py-5 bg-white">
                <h1 className="text-center text-2xl font-bold text-gray-800">Search result's query : {query} </h1>
            </div>
            {data.length > 0 ?
                <>
                    <ProductList data={data} />

                    <div className='bg-white'>
                        <div className='flex flex-row justify-center items-center shadow-sm p-2 rounded-lg'>
                            <button className='text-xl font-bold py-1 px-1 border-r-2 border-gray-500 bg-gray-300' onClick={() => setPage(pageDecrement(page))}>Previous</button>
                            <button className='text-xl font-bold py-1 px-5 border-r-2 border-gray-500 bg-gray-300'>{page}</button>
                            <button className='text-xl font-bold py-1 px-1 bg-gray-300' onClick={() => setPage(page + 1)}>Next</button>
                        </div>
                    </div>
                </>
                :
                (
                    <>
                        <h1 className="text-center text-2xl font-bold text-gray-800">Product not found related to {query} </h1>
                    </>
                )

            }
        </Layout>
    )
}

export default SearchResult