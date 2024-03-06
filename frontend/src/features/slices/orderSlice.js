import { createSlice } from '@reduxjs/toolkit';
import { createOrder, loadOrder, loadOrderData, buyAll, filterOrder, cancelOrReturnOrder } from '../actions/orderActions';

const initialState = {
    order_loading : true,
    status : '',
    orders : [],
    orderdata : [],
    error : null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {    
  },
  
  extraReducers(builder) {
    builder
      .addCase(loadOrder.pending, (state) =>{
        state.order_loading = true;
      })

      .addCase(loadOrder.fulfilled, (state, action) => {
        state.order_loading = false;
        // console.log("cart data...", action.payload);
        state.orders = action.payload;
        state.error = null;
      })

      .addCase(loadOrder.rejected, (state, action) => {
        state.order_loading = false;
        state.orders = []
        state.error = action.payload ? action.payload.message : "An error occurred while adding to cart.";
      })

      .addCase(loadOrderData.pending, (state) =>{
        state.order_loading = true;
      })

      .addCase(loadOrderData.fulfilled, (state, action) => {
        state.order_loading = false;
        state.error = null;
        // console.log("order data...", action.payload)
        state.orderdata=action.payload;
      })

      .addCase(loadOrderData.rejected, (state, action) => {
        state.order_loading = false;
        state.error = action.payload ? action.payload.message : "An error occurred while adding to cart.";
      })

      .addCase(createOrder.pending, (state) =>{
        state.order_loading = true;
      })

      .addCase(createOrder.fulfilled, (state, action) => {
        state.order_loading = false;
        state.error = null;
        // state.orderdata=action.payload;
      })

      .addCase(createOrder.rejected, (state, action) => {
        state.order_loading = false;
        state.error = action.payload ? action.payload.message : "An error occurred while adding to cart.";
      })

      .addCase(buyAll.pending, (state) =>{
        state.order_loading = true;
      })

      .addCase(buyAll.fulfilled, (state, action) => {
        state.order_loading = false;
        state.error = null;
        state.status = action.payload.status;
      })

      .addCase(buyAll.rejected, (state, action) => {
        state.order_loading = false;
        state.error = action.payload ? action.payload.message : "An error occurred while order from cart.";
        state.status = action.payload.status;
      })
      .addCase(filterOrder.pending, (state) =>{
        state.order_loading = true;
      })

      .addCase(filterOrder.fulfilled, (state, action) => {
        state.order_loading = false;
        state.orders = action.payload;
        state.error = null;
      })

      .addCase(filterOrder.rejected, (state, action) => {
        state.order_loading = false;
        state.orders = []
        state.error = action.payload ? action.payload.message : "An error occurred while adding to cart.";
      })
      .addCase(cancelOrReturnOrder.pending, (state) =>{
        state.order_loading = true;
      })

      .addCase(cancelOrReturnOrder.fulfilled, (state, action) => {
        state.order_loading = false;
        state.status = action.payload;
        state.error = null;
      })

      .addCase(cancelOrReturnOrder.rejected, (state, action) => {
        state.order_loading = false;
        state.status = []
        state.error = action.payload ? action.payload.message : "An error occurred while adding to cart.";
      })
  }
});

export const {  } = orderSlice.actions;

export default orderSlice.reducer;