import React from 'react'
import { API } from '../backend';
import Swal from 'sweetalert2';
import axios from 'axios';

const StockNotify = ({product_id}) => {

    const handleNotifyMe = async () => {
        try {
          const response = await axios.post(`${API}/notify/me/`, {
            product_id: product_id,
          }, {
            headers: {
              "Content-Type": "application/json",
              'Authorization': `JWT ${localStorage.getItem('access')}`
            },
          });
      
          Swal.fire({
            icon: 'success',
            title: 'Request Successful.',
            text: response.data.message,
          });
      
        } catch (error) {
          console.error('Error:', error);
          Swal.fire({
            icon: 'warning',
            title: 'Request Failed.',
            text: 'An error occurred while processing your request.',
          });
        }
      };
      
  
    return (
      <div className=''>
        <button onClick={handleNotifyMe}
        className='bg-orange-600 hover:bg-orange-700 px-2 py-2 rounded-lg text-white'
        >Notify Me</button>
      </div>
    );
}

export default StockNotify