
import axios from 'axios';
import { API } from '../../backend';
import { createAsyncThunk } from "@reduxjs/toolkit";




export const filterProduct = createAsyncThunk(
    "filterProduct", async ({sorted, price_range, date}, {rejectWithValue})=> {
        try {
            const response = await axios.get(`${API}/product/filter-products/`, {
              params: {
                effective_price: sorted,
                price_range : price_range,
                date : date 
              },
            });
            return  response.data;
            
          } catch (error) {
            console.error('Error fetching filter data:', error);
            return rejectWithValue(error);
          }
    }
)

export const searchProduct = createAsyncThunk(
    "searchProduct", async (query, { rejectWithValue }) => {
        try {
            console.log("cat", query)
            const response = await fetch(`${API}/product/search-product/?q=${query}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const result = await response.json();
                return result;
            } else {
                throw new Error('Failed to search product');
            }
        } catch (error) {
            console.log("error...", error)
            return rejectWithValue(error);
        }
    }
);

export const loadAllProduct = createAsyncThunk(
    "loadAllProduct", async (page, { rejectWithValue }) => {
        try {
            const response = await fetch(`${API}/product/list/?page=${page}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                return data.results;
            } else {
                throw new Error('Failed to fetch product data');
            }
        } catch (err) {
            return rejectWithValue(err);
        }
    }
);

export const loadProductData = createAsyncThunk(
    "loadProductData",async(uid, {rejectWithValue})=>{
        try {
            
            const response = await fetch(`${API}/product/get/${uid.uid}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
              
                return data;
            } else {
                throw new Error('Failed to fetch product data');
            }

        } catch (err) {
            return rejectWithValue(err);
        }
    }
); 
 

export const addProduct = createAsyncThunk(
    "addProduct",
    async ({ product_name, editorData, actual_price, discount, stock, category, volume, productImage, brand_name, date }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('product_name', product_name);
            formData.append('product_description', editorData);
            formData.append('actual_price', actual_price);
            formData.append('discount', discount);
            formData.append('stock', stock);
            formData.append('category', category);
            formData.append('volume', volume);
            formData.append('image', productImage);
            formData.append('brand_name', brand_name);
            formData.append('expiry_date', new Date(date).toISOString());

            const response = await fetch(`${API}/product/add/`, {
                method: "POST",
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
                body: formData,
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

export const updateProductData = createAsyncThunk(
    "updateProductData",
    async ({ product_name, product_description, actual_price, discount, stock, category, volume, productImage, brand_name, date, uid }, { rejectWithValue }) => {
        console.log("uid", uid)
        try {
            const formData = new FormData();
            if(product_name){
                formData.append('product_name', product_name);
            }
            if(product_description){
                formData.append('product_description', product_description);
            }
            if(actual_price){
                formData.append('actual_price', actual_price);
            }
            if(discount){
                formData.append('discount', discount);
            }
            if(stock){
                formData.append('stock', stock);
            }
            if(category){
                formData.append('category', category);
            }
            if(productImage){
                formData.append('image', productImage);
            }
            if(volume){
                formData.append('volume', volume);
            }
            if(brand_name){
                formData.append('brand_name', brand_name);
            }
            if(date){
                formData.append('expiry_date', new Date(date).toISOString());
            }

            const response = await fetch(`${API}/product/actions/${uid}/`, {
                method: "PATCH",
                headers: {
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                },
                body: formData
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

export const deleteData = createAsyncThunk(
    "deleteData",async({ uid }, {rejectWithValue})=>{
        try {
           
            const response = await fetch(`${API}/product/actions/${uid}/`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
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