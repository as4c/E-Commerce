import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteAccount } from '../features/actions/authActions';
import { unwrapResult } from '@reduxjs/toolkit';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ConfirmDelete = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onDelete = async ()=> {
    dispatch(deleteAccount())
    Swal.fire({
      icon: 'success',
      title: 'Account deleted.',
      text: 'Account delete successfully.',
    });
    navigate('/')
    
  }


  return (
    <div className='flex flex-col rounded-lg bg-gray-200 m-5 h-75'>
      <div className='justify-center mx-auto'>
        <h1 className='text-2xl font-semibold m-5'>Confirm delete</h1>
        <p className='text-xl m-5'>Are you sure?</p>
        <button 
        className='my-2 mx-5 px-3 py-2 bg-red-700 hover:bg-red-800 rounded-lg w-40'
        onClick={onDelete}
        >Yeah, i'm sure.</button>
      </div>
    </div>
  )
}

export default ConfirmDelete;