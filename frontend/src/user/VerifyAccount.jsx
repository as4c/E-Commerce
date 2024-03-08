import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BaseUrl } from '../backend';

const VerificationComponent = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState(null);
  useEffect(() => {
    document.title = 'Verify account';
}, []);
  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/api/accounts/verify/${uid}/${token}`);
        setVerificationStatus(response.data.msg);
      } catch (error) {
        console.error('Verification failed:', error);
        setVerificationStatus('Verification failed. Please try again or contact support.');
      }
    };

    verifyAccount();
  }, [uid, token]);

  const redirectToLogin = () => {
    navigate('/signin');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md max-w-md">
        {verificationStatus ? (
          <div>
            <p className="text-green-600">{verificationStatus}</p>
            <button
              onClick={redirectToLogin}
              className="mt-4 bg-orange-500 text-center text-white px-4 py-2 rounded hover:bg-orange-700 focus:outline-none"
            >
              Login Now
            </button>
          </div>
        ) : (
          <p className="text-gray-700">Verifying account...</p>
        )}
      </div>
    </div>
  );
};

export default VerificationComponent;
