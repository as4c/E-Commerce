
import Swal from 'sweetalert2';
import { API } from '../../backend';
import { createAsyncThunk } from "@reduxjs/toolkit";



export const InitiatePayment = createAsyncThunk(
    "InitiatePayment",async({ order, amount }, {rejectWithValue})=>{
        try {
        
            const response = await fetch(`${API}/payment/process/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
                body : JSON.stringify({
                    order,
                    amount
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                // console.log("initiate response...", data);
                return data;
            } else {
                
                throw new Error('Failed to fetch data');
            }

        } catch (err) {
            
            return rejectWithValue(err);
        }
    }
);


export const CompletePayment = createAsyncThunk(
    "CompletePayment",async({order, paymentID, orderID, signature, amount }, {rejectWithValue})=>{
        try {
            
            const response = await fetch(`${API}/payment/complete/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
                body : JSON.stringify({
                    order,
                    paymentID,
                    orderID,
                    signature,
                    amount
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                // console.log("complete response...", data);
                return data;
            } else {
                
                throw new Error('Failed to fetch data');
            }

        } catch (err) {
            
            return rejectWithValue(err);
        }
    }
);






export const InitiatePaymentForAll = createAsyncThunk(
    "InitiatePaymentForAll",async({ orders, amount }, {rejectWithValue})=>{
        try {
            const response = await fetch(`${API}/payment/process-all/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
                body : JSON.stringify({
                    orders,
                    amount
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                // console.log("initiate response...", data);
                return data;
            } else {
                
                throw new Error('Failed to fetch data');
            }

        } catch (err) {
            
            return rejectWithValue(err);
        }
    }
);


export const CompletePaymentForAll = createAsyncThunk(
    "CompletePaymentForAll",async({orders, paymentID, orderID, signature, amount }, {rejectWithValue})=>{
        try {
            
            const response = await fetch(`${API}/payment/complete-all/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
                body : JSON.stringify({
                    orders,
                    paymentID,
                    orderID,
                    signature,
                    amount
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                // console.log("complete response...", data);
                return data;
            } else {
                
                throw new Error('Failed to fetch data');
            }

        } catch (err) {
            
            return rejectWithValue(err);
        }
    }
);

