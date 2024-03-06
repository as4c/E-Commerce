
import { API } from '../../backend';
import { createAsyncThunk } from "@reduxjs/toolkit";



export const loadWishlist = createAsyncThunk(
    "loadWishlist",async(args, {rejectWithValue})=>{
        try { 
            const response = await fetch(`${API}/users/wishlist/`, {
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
 
 


export const addToWishlist = createAsyncThunk(
    "addToWishlist",async({ uid }, {rejectWithValue})=>{
        try {
        //    console.log("product...", uid)
            const response = await fetch(`${API}/users/wishlist/`, {
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

export const removeFromWishlist = createAsyncThunk(
    "removeFromWishlist",async(uid, {rejectWithValue})=>{
        try { 
            const response = await fetch(`${API}/users/wishlist/`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
                body : JSON.stringify({data : uid})
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