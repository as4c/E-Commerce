
import { API } from '../../backend';
import { createAsyncThunk } from "@reduxjs/toolkit";



export const loadCategory = createAsyncThunk(
    "loadCategory",async(args, {rejectWithValue})=>{
        try {
           
            const response = await fetch(`${API}/category/get`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            // console.log('Response Status:', response.status);
            
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
 
 


export const createCategory = createAsyncThunk(
    "createCategory",async({name, description}, {rejectWithValue})=>{
        try {
           
            const response = await fetch(`${API}/category/create/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
                body : JSON.stringify({name, description})
            });
            
            // console.log('Response Status:', response.status);
            
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

export const updateCategory = createAsyncThunk(
    "updateCategory",async({name, description}, {rejectWithValue})=>{
        try {
           
            const response = await fetch(`${API}/category/update/`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
                body : JSON.stringify({name, description})
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