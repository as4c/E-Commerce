import React from 'react'
import { Link } from 'react-router-dom'

const Settings = () => {
  return (
    <div className='flex flex-col justify-center mx-auto px-10 '>
      <h1 className='text-2xl my-5 text-center'>Settings</h1>
      <div className='items-center my-2'>
        <Link to='/user/update-profile' className='px-2 mx-3 bg-green-600 hover:bg-green-700 py-2 rounded-lg font-semibold'>Update Account</Link>
      </div>
      <div className='my-2'>
        <Link to='/user/delete-account' className='px-2 mx-3 bg-red-600 hover:bg-red-700 py-2 rounded-lg font-semibold'>Delete Account</Link>
      </div>
    </div>
  )
}

export default Settings;