import { useSelector } from 'react-redux';
import { API } from '../../backend';
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


   
export const GoogleAuth = createAsyncThunk(
    "GoogleAuth",async(code, {rejectWithValue})=>{
      
        try {
            const res = await axios.get(`${API}/accounts/google/${code}`);
            return res.data;
        } catch (err) {
            console.log("error", err);
            return rejectWithValue(err);
        }
        
    }
); 



/*****************************************************************************************************************************
    action for loading profile data
*****************************************************************************************************************************/
//Get user data action
export const laodProfile = createAsyncThunk(
    "loadProfile",
    async (args, { rejectWithValue }) => {
        if (localStorage.getItem('access')) {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                        'Accept': 'application/json'
                    }
                };
                const response = await fetch(
                    `${API}/accounts/profile/`,
                    config
                );
                const result = await response.json();
                return result;
            } catch (err) {
                return rejectWithValue("Opps found an error", err.response.data);
            }
        }else{
            console.log("Login first.")
        }
    }
);


/*****************************************************************************************************************************
    action for creating new user(signup)
*****************************************************************************************************************************/

export const signup = createAsyncThunk(
    "signup",
    async ({ first_name, last_name, username, email, profilePic, phone, gender, password, password2 }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('first_name', first_name);
            formData.append('last_name', last_name);
            formData.append('username', username);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('gender', gender);
            formData.append('password', password);
            formData.append('password2', password2);
            formData.append('profile_pic', profilePic);
    
            const response = await fetch(`${API}/accounts/signup/`, {
                method: "POST",
                body: formData,  
            });
    
            console.log("signup res: ", response);
            return await response.json();
        } catch (err) {
            console.log(err);
            return rejectWithValue(err);;
        }
    }
  );



  
export const signin = createAsyncThunk(
    "signin",async({email, password}, {rejectWithValue})=>{
        const formData = new FormData()
        formData.append('email', email);      
        formData.append('password', password);

        try {
            // console.log(API)
            const response = await fetch(`${API}/accounts/signin/`, {
                method: "POST",
                body: formData,
            });
            const data = await response.json(); 
            return data;

        } catch (err) {
            return rejectWithValue(err);
        }
    }
); 

export const signout = createAsyncThunk(
    "signout",async(args, {rejectWithValue})=>{
       
        try {
            const response = await fetch(`${API}/accounts/logout/`, {
                method: "POST",
            });
            const data = await response.json(); 
            return data;

        } catch (err) {
            return rejectWithValue(err);
        }
    }
);



export const deleteAccount = createAsyncThunk(
    "deleteAccount",async(args, {rejectWithValue})=>{
        try {
            const response = await fetch(`${API}/accounts/delete/`, {
                method: "DELETE",
                headers : {
                    'Authorization' : `JWT ${localStorage.getItem('access')}`
                }
            });
            const data = await response.json(); 
            console.log(
                'data...', data
            )
            return data;

        } catch (err) {
            return rejectWithValue(err);
        }
    }
);


/*****************************************************************************************************************************
    action for update account info
*****************************************************************************************************************************/

export const updateProfile = createAsyncThunk(
    "updateProfile",
    async ({ first_name, last_name, username, profilePic, phone, gender }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            if(first_name){
                formData.append('first_name', first_name);
            }
            if(last_name){
                formData.append('last_name', last_name);
            }
            if(username){
                formData.append('username', username);
            }
            if(phone){
                formData.append('phone', phone);
            }
            if(gender){
                formData.append('gender', gender);
            }
            if(profilePic){
                formData.append('profile_pic', profilePic);
            }
            
    
            const response = await fetch(`${API}/accounts/profile/`, {
                method: "PATCH",
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
                body: formData,  
            });
    
            console.log("profile update res: ", response);
            return await response.json();
        } catch (err) {
            console.log(err);
            return rejectWithValue(err);;
        }
    }
  );




export const refreshToken = createAsyncThunk(
    'refreshToken',
    async (args, { rejectWithValue }) => {
      const { refresh } = useSelector((state) => state.auth);
      console.log("refresh...", refresh)
      try {
        // Call your API function to refresh the access token
        const response = await fetch(`${API}/accounts/token/refresh/`, {
            method: "POST",
            body: JSON.stringify({refresh}),
        });
        
        console.log(response.json())
        const newAccessToken = response.data.access;
        localStorage.setItem('access', newAccessToken);
        return newAccessToken;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );