
import { API } from '../../backend';
import { createAsyncThunk } from "@reduxjs/toolkit";



export const loadOrder = createAsyncThunk(
    "loadOrder",async(args, {rejectWithValue})=>{
        try {
           
            const response = await fetch(`${API}/order/`, {
                method: "GET",
                headers: {
                    'Content-Type'  : 'application/json',
                    'Authorization' : `JWT ${localStorage.getItem('access')}`
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
 

export const loadOrderData = createAsyncThunk(
    "loadOrderData",async({uid}, {rejectWithValue})=>{
        try {
            const response = await fetch(`${API}/order/get/${uid}/`, {
                method: "GET",
                headers: {
                    'Content-Type'  : 'application/json',
                    'Authorization' : `JWT ${localStorage.getItem('access')}`
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                // console.log("order data...", data)
                return data;
            } else {
                throw new Error('Failed to fetch data');
            }

        } catch (err) {
            return rejectWithValue(err);
        }
    }
); 



export const createOrder = createAsyncThunk(
    "createOrder",async({ product, address, quantity, payment_mode }, {rejectWithValue})=>{
        try {
            const response = await fetch(`${API}/order/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
                body : JSON.stringify({
                    product: product.uid,
                    customer_address: address,
                    quantity,
                    payment_mode
                })
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

export const buyAll = createAsyncThunk(
    "buyAll",async({ address, payment_mode }, {rejectWithValue})=>{
        try {
            const response = await fetch(`${API}/order/buy-all/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
                body : JSON.stringify({
                    customer_address: address,
                    payment_mode
                })
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


export const filterOrder = createAsyncThunk(
    "filterOrder",async({ type, value }, {rejectWithValue})=>{
        try {
            const response = await fetch(`${API}/order/filter/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
                body : JSON.stringify({
                    type,
                    value
                })
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


export const cancelOrReturnOrder = createAsyncThunk(
    "cancelOrReturnOrder",async({order_id,  status }, {rejectWithValue})=>{
        try {
            const response = await fetch(`${API}/order/cancel-return/${order_id}/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
                body : JSON.stringify({
                    status
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                console.log("response...", data);
                return data;
            } else {
                throw new Error('Failed to fetch data');
            }

        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

