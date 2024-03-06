import React from 'react';
import Layout from '../Layout';

const ErrorPage = () => {
  return (
    <Layout>
        <div className="pt-10 bg-white my-auto text-center">
        <h1 className="text-center text-2xl font-bold text-gray-800">404 - Not Found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
      </div>
    </Layout>
  );
};

export default ErrorPage;
