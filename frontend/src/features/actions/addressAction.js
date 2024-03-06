
import { API } from '../../backend';
import { createAsyncThunk } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';



export const loadAddress = createAsyncThunk(
    "loadAddress", async (args, { rejectWithValue }) => {
        try {

            const response = await fetch(`${API}/accounts/addresses`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
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




export const createAddress = createAsyncThunk(
    "createAddress",
    async ({ address1, landmark, city, state, country, zipcode }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API}/accounts/addresses/`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
                body: JSON.stringify({ address1, landmark, city, state, country, zipcode })
            });

            if (response.ok) {
                const data = await response.json();
                Swal.fire({
                    icon: 'success',
                    title: 'Address Added Successfully.',
                    text: data.msg
                });
                return data;
            } else {
                const errorResponse = await response.json();
                const errorFields = Object.keys(errorResponse.errors);
                console.log(errorFields)
                const errorMessage = errorFields.map(field => `${field}: ${errorResponse.errors[field][0]}`).join('\n');

                Swal.fire({
                    icon: 'error',
                    title: 'Failed to create address',
                    text: errorMessage,
                });


                // Return the error so that it can be handled by Redux Toolkit
                return rejectWithValue(errorResponse);
            }

        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Failed to create address',
                text: `Unexpected error: ${err.message}`,
            });

            // Return the error so that it can be handled by Redux Toolkit
            return rejectWithValue(err);
        }
    }
);


export const updateAddress = createAsyncThunk(
    "updateAddress", async ({ type, address1, landmark, city, state, country, zipcode, uid }, { rejectWithValue }) => {
        try {

            const response = await fetch(`${API}/accounts/addresses/${uid}/`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
                body: JSON.stringify({ type, address1, landmark, city, state, country, zipcode })
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


export const deleteAddress = createAsyncThunk(
    "deleteAddress", async ({ uid }, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API}/accounts/addresses/${uid}/`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`
                },
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
