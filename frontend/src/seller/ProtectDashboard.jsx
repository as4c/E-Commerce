import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectDashboard = () => {
  const { sellerAuthenticated, sellerAccess } = useSelector((state) => state.seller);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sellerAuthenticated && !sellerAccess) {
      navigate('/user/seller/login');
    }
  }, [sellerAuthenticated, sellerAccess, navigate]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectDashboard;
