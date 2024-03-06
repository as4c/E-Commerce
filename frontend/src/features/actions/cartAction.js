
import { API } from '../../backend';
import { createAsyncThunk } from "@reduxjs/toolkit";



export const loadCart = createAsyncThunk(
    "loadCart",async(args, {rejectWithValue})=>{
        try {
           
            const response = await fetch(`${API}/users/cart/`, {
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
 
 


export const addToCart= createAsyncThunk(
    "addToCart",async({ uid }, {rejectWithValue})=>{
        try {
        //    console.log("product...", uid)
            const response = await fetch(`${API}/users/cart/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
                body : JSON.stringify({product:uid})
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

export const removeFromCart = createAsyncThunk(
    "removeFromCart",async(uid, {rejectWithValue})=>{
        try { 
            const response = await fetch(`${API}/users/cart/remove/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
                body : JSON.stringify(uid)
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