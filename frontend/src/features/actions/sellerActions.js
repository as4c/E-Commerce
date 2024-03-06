import axios from 'axios';
import { API } from '../../backend';
import { createAsyncThunk } from "@reduxjs/toolkit";

/*****************************************************************************************************************************
    action for creating seller account
*****************************************************************************************************************************/

export const createSellerAccounts = createAsyncThunk(
    "createSellerAccounts",
    async ({ shopName, gstNumber, alternatePhone, aadharNumber, confirmAadharNumber, bankAccount, confirmBankAccount, bankIfscCode, confirmIfscCode, address1, landmark, city, state, zipcode, country }, { rejectWithValue }) => {
        if (localStorage.getItem('access')) {
            try {
                const formData = new FormData();
                formData.append('shop_name', shopName);
                formData.append('gst_number', gstNumber);
                formData.append('alternate_phone', alternatePhone);
                formData.append('aadhar_number', aadharNumber);
                formData.append('retype_aadhar', confirmAadharNumber);
                formData.append('bank_account', bankAccount);
                formData.append('retype_bank_account', confirmBankAccount);
                formData.append('bank_ifsc_code', bankIfscCode);
                formData.append('retype_ifsc_code', confirmIfscCode);
                formData.append('address1', address1);
                formData.append('landmark', landmark);
                formData.append('city', city);
                formData.append('state', state);
                formData.append('zipcode', zipcode);
                formData.append('country', country);

                // Convert FormData to JSON string
                const formDataJsonString = JSON.stringify(Object.fromEntries(formData.entries()));

                const response = await axios.post(`${API}/accounts/vendor/`, formDataJsonString, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                    },
                });

                console.log("create seller res: ", response.data);
                return response.data;
            } catch (err) {
                console.error("Server Error:", err);
                return rejectWithValue(err);
            }
        } else {
            return { "message": "You are not authenticated." };
        }
    }
);


export const sellerLogin = createAsyncThunk(
    "sellerLogin",async(shopId, {rejectWithValue})=>{
        const formData = new FormData()
        formData.append('vendor_id', shopId);      
        const formDataJsonString = JSON.stringify(Object.fromEntries(formData.entries()));

        try {
            const response = await fetch(`${API}/accounts/vendor/login/`, {
                method: "POST",
                body: formDataJsonString,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                }
            });
        
            if (!response.ok) {
                const errorMessage = await response.text();
                return rejectWithValue({ errors: { nonFieldError: errorMessage } });
            }
        
            const data = await response.json();
            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
        
    }
); 

export const loadDashboard = createAsyncThunk(
    "loadDashboard",async(args, {rejectWithValue})=>{
        try {
           
            const response = await fetch(`${API}/accounts/vendor/dashboard`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                }
            });  
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error('Failed to fetch data');
            }

        } catch (err) {
            return rejectWithValue(err);
        }
    }
); 



export const loadProductList = createAsyncThunk(
    "loadProductList",async(args, {rejectWithValue})=>{
        try {
           
            const response = await fetch(`${API}/accounts/vendor/product-list`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error('Failed to fetch data');
            }

        } catch (err) {
            return rejectWithValue(err);
        }
    }
); 


export const getOrders = createAsyncThunk(
    "getOrders", async(args, {rejectWithValue}) => {
        try {
            const response = await fetch(`${API}/accounts/vendor/order-list/`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error('Failed to fetch data');
            }

        } catch (err) {
            return rejectWithValue(err);
        }
});


export const getOrderDetails = createAsyncThunk(
    "getOrderDetails", async({uid}, {rejectWithValue}) => {
        try {
        
            const response = await fetch(`${API}/accounts/vendor/order-details/${uid}/`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error('Failed to fetch data');
            }

        } catch (err) {
            return rejectWithValue(err);
        }
});

export const UpdateOrderStatus = createAsyncThunk(
    "UpdateOrderStatus",
    async ({ uid, status }, { rejectWithValue }) => {
      try {
        const response = await fetch(`${API}/accounts/vendor/update-order-status/${uid}/`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
          },
          body: JSON.stringify({ status }),
        });
  
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          throw new Error('Failed to update order status');
        }
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  
  
  