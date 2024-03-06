import axios from 'axios';
import { API } from '../../backend';
import { createAsyncThunk } from "@reduxjs/toolkit";

/*****************************************************************************************************************************
                                Action To Create Delivery Boy Account
*****************************************************************************************************************************/

export const createDeliveryBoyAccount = createAsyncThunk(
    "reateDeliveryBoyAccount",
    async ({ DLNumber, panCardNumber, alternatePhone, aadharNumber, confirmAadharNumber, bankAccount, confirmBankAccount, bankIfscCode, confirmIfscCode, locality, city, state, zipcodes }, { rejectWithValue }) => {
        if (localStorage.getItem('access')) {
            try {
                const formData = new FormData();
                formData.append('dl_number', DLNumber);
                formData.append('pan_card_number', panCardNumber);
                formData.append('alternate_phone', alternatePhone);
                formData.append('aadhar_number', aadharNumber);
                formData.append('retype_aadhar', confirmAadharNumber);
                formData.append('bank_account', bankAccount);
                formData.append('retype_bank_account', confirmBankAccount);
                formData.append('bank_ifsc_code', bankIfscCode);
                formData.append('retype_ifsc_code', confirmIfscCode);
                formData.append('locality', locality);
                formData.append('city', city);
                formData.append('state', state);
                formData.append('zipcodes', zipcodes);
               
                const formDataJsonString = JSON.stringify(Object.fromEntries(formData.entries()));

                const response = await axios.post(`${API}/accounts/delivery-boy/register/`, formDataJsonString, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                    },
                });

                console.log("create delivery boy res: ", response.data);
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


export const DeliveryBoyLogin = createAsyncThunk(
    "DeliveryBoyLogin",async(DeliveryBoyId, {rejectWithValue})=>{
        const formData = new FormData()
        formData.append('delivery_boy_id', DeliveryBoyId);      
        const formDataJsonString = JSON.stringify(Object.fromEntries(formData.entries()));

        try {
            const response = await fetch(`${API}/accounts/delivery-boy/login/`, {
                method: "POST",
                body: formDataJsonString,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                }
            });
        
            if (!response.ok) {
                const errorMessage = await response.text();
                console.error('Server Error:', errorMessage);
                return rejectWithValue({ errors: { nonFieldError: errorMessage } });
            }
            const data = await response.json();
            return data;
        } catch (err) {
            return rejectWithValue(err);
        }
        
    }
); 

export const loadDeliveryBoyDashboard = createAsyncThunk(
    "loadDeliveryBoyDashboard",async({uid}, {rejectWithValue})=>{
        try {
           
            const response = await fetch(`${API}/accounts/delivery-boy/actions/${uid}/`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                }
            });
            
            console.log('Response Status:', response.status);
            
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



export const getAllParcels = createAsyncThunk(
    "getAllParcels", async(args, {rejectWithValue}) => {
        try {
           
            const response = await fetch(`${API}/accounts/delivery-boy/parcels/`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log("parcells...", data);
                return data;
            } else {
                throw new Error('Failed to fetch data');
            }

        } catch (err) {
            return rejectWithValue(err);
        }
});


export const getParcelDetails = createAsyncThunk(
    "getParcelDetails", async({uid}, {rejectWithValue}) => {
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

export const DeliverOrPickupParcel = createAsyncThunk(
    "DeliverOrPickupParcel",
    async ({ uid, status }, { rejectWithValue }) => {
      try {
        const response = await fetch(`${API}/accounts/delivery-boy/deliver-pickup/${uid}/`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
          },
          body: JSON.stringify({ status }),
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("Order status updated:", data);
          return data;
        } else {
          throw new Error('Failed to update order status');
        }
      } catch (err) {
        return rejectWithValue(err);
      }
    }
  );
  