import React from 'react';
import Layout from './Layout';
import GetAllProducts from '../product/GetAllProducts';

const Home = () => {
  
  return (
    <Layout>
      <div className="">
        <GetAllProducts />
      </div>
    </Layout>
  );
};

export default Home;
