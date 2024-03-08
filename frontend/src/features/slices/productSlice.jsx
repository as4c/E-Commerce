import { createSlice } from '@reduxjs/toolkit';
import { addProduct, deleteData, filterProduct, loadAllProduct, loadProductData, searchProduct, updateProductData } from '../actions/productActions';



const initialState = {
    loading : true,
    loaded : false,
    data : [],
    product : [],
    error : null
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {    
    resetProductData : (state, action) => { 
      state.loading = true;
      state.product = [];
      state.loading = false;
  },
  },
  
  extraReducers(builder) {
    builder
      .addCase(loadAllProduct.pending, (state) =>{
        state.loading = true;
        state.data = []
      })
      .addCase(loadAllProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
        state.error = null;
      })
      .addCase(loadAllProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(loadProductData.pending, (state) =>{
        state.loading = true;
        state.product = [];
      })
      .addCase(loadProductData.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
        state.error = null;
      })
      .addCase(loadProductData.rejected, (state, action) => {
        state.loading = false;
        state.product = [];
        state.error = action.payload;
      })
      .addCase(addProduct.pending, (state) =>{
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        // state.product = action.payload.data;
        state.data.push(action.payload.data);
        state.error = null;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProductData.pending, (state) =>{
        state.loading = true;
      })
      .addCase(updateProductData.fulfilled, (state, action) => {
        state.loading = false;
        // state.product = action.payload.data;
        state.error = null;
      })
      .addCase(updateProductData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteData.pending, (state) =>{
        state.loading = true;
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.data;
        state.error = null;
      })
      .addCase(deleteData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(searchProduct.pending, (state) =>{
        state.loading = true;
        state.data = []
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.results;
        state.error = null;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(filterProduct.pending, (state) =>{
        state.loading = true;
        state.data = []
      })
      .addCase(filterProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload
        state.error = null;
      })
      .addCase(filterProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export const { resetProductData } = productSlice.actions;

export default productSlice.reducer;