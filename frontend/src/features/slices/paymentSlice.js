import { createSlice } from '@reduxjs/toolkit';
import { CompletePayment, InitiatePayment, InitiatePaymentForAll, CompletePaymentForAll } from '../actions/paymentAction';

const initialState = {
    payment_loading : false,
    payments : [],
    error : null
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {    
  },
  
  extraReducers(builder) {
    builder
      .addCase(InitiatePayment.pending, (state) =>{
        state.payment_loading = true;
        state.payments = []
      })

      .addCase(InitiatePayment.fulfilled, (state, action) => {
        state.payment_loading = false;
        state.error = null;
        console.log("initiate payment...", action.payload)
        state.payments = action.payload;
      })

      .addCase(InitiatePayment.rejected, (state, action) => {
        state.payment_loading = false;
        state.error = action.payload ? action.payload.message : "An error occurred while adding to cart.";
      })

      .addCase(CompletePayment.pending, (state) =>{
        state.payment_loading = true;
        state.payments = []
      })

      .addCase(CompletePayment.fulfilled, (state, action) => {
        state.payment_loading = false;
        state.error = null;
        console.log("complete payment...", action.payload)
        state.payments = action.payload;
      })

      .addCase(CompletePayment.rejected, (state, action) => {
        state.payment_loading = false;
        state.payments = []
        state.error = action.payload;
      })

      .addCase(InitiatePaymentForAll.pending, (state) =>{
        state.payment_loading = true;
        state.payments = []
      })

      .addCase(InitiatePaymentForAll.fulfilled, (state, action) => {
        state.payment_loading = false;
        state.error = null;
        console.log("initiate payment...", action.payload)
        state.payments = action.payload;
      })

      .addCase(InitiatePaymentForAll.rejected, (state, action) => {
        state.payment_loading = false;
        state.error = action.payload ? action.payload.message : "An error occurred while adding to cart.";
      })

      .addCase(CompletePaymentForAll.pending, (state) =>{
        state.payment_loading = true;
        state.payments = []
      })

      .addCase(CompletePaymentForAll.fulfilled, (state, action) => {
        state.payment_loading = false;
        state.error = null;
        console.log("complete payment...", action.payload)
        state.payments = action.payload;
      })

      .addCase(CompletePaymentForAll.rejected, (state, action) => {
        state.payment_loading = false;
        state.payments = []
        state.error = action.payload;
      })

  }
});

export const {  } = paymentSlice.actions;

export default paymentSlice.reducer;