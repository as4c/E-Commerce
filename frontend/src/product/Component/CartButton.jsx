import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { unwrapResult } from '@reduxjs/toolkit';
import { addToCart } from '../../features/actions/cartAction';

const CartButton = ({ uid }) => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);

    const AddToCart = (uid) => {
        if (!isAuthenticated) {
            Swal.fire({
                icon: 'error',
                title: 'UnAuthorized!',
                text: "Login first.",
            });
        } else {
            dispatch(addToCart({ uid }))
                .then((res1 => {
                    const res = unwrapResult(res1);
                    if (!res.error) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Success.',
                            text: res.msg,
                        });
                    } else {
                        const errorFields = Object.keys(res.errors);
                        const errorMessage = errorFields.map(field => `${field}: ${res.errors[field][0]}`).join('\n');
                        Swal.fire({
                            icon: 'error',
                            title: 'Something went wrong.',
                            text: errorMessage,
                        });
                    }
                }))
        }
    }

    return (
        <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-2 py-1.5 text-white duration-100 hover:bg-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>

            <button
                onClick={() => AddToCart({ uid: uid})}
                className="text-sm">
                Add to cart
            </button>
        </div>
    )
}

export default CartButton