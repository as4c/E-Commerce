import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

const ProtectedRoutes = () => {
    const {isAuthenticated} = useSelector((state) => state.auth);
    const navigate = useNavigate();
    if(!isAuthenticated){
        navigate('/signin')
    }
  return (
    <div>
        <Outlet />
    </div>
  )
}

export default ProtectedRoutes;