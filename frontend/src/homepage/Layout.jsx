import React, { useEffect } from 'react';
import Navbar from './Component/Navbar';
import Footer from './Component/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from '../features/actions/authActions';
import Categories from '../category/Categories';


const Layout = ({ children }) => {
  
  return (
    <div className='flex flex-col justify-between'>
      <div className='sticky top-0 z-10'>
        <Navbar />
        <div className='mt-6'></div>
        <Categories />
      </div>

      <main className='w-full h-full z-0'>
        {children}
      </main>
      <div className='bottom-0 z-0'>
        <Footer />
      </div>

    </div>
  );
};

export default Layout;
