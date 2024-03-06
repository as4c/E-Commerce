import { createSlice } from '@reduxjs/toolkit';
import { 
  createSellerAccounts, 
  loadDashboard, 
  loadProductList, 
  sellerLogin,
  getOrders,
  getOrderDetails,
  UpdateOrderStatus

} from '../actions/sellerActions';
import { filterOrder } from '../actions/orderActions';

const initialState = {
    sellerAccess: localStorage.getItem('sellerAccess'),
    sellerRefresh: localStorage.getItem('sellerRefresh'),
    sellerAuthenticated : false,
    loading : true,
    sellers : [],
    list : [],
    orders : [],
    order_data : [],
    res : [],
    error : null,
};

const sellerSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {

    
  },
  
  extraReducers(builder) {
    builder
      .addCase(createSellerAccounts.pending, (state) =>{
        state.loading = true;
      })
      .addCase(createSellerAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.sellers = action.payload.data;
        state.error = null;
      })
      .addCase(createSellerAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.sellers = []
      })
      .addCase(sellerLogin.pending, (state) =>{
        state.loading = true;
      })
      .addCase(sellerLogin.fulfilled, (state, action) => {
        state.sellerAuthenticated = true;
        state.loading = false;
        state.sellers = action.payload.data;
        state.error = null;
        state.sellerAccess  =  action.payload.vendor_tokens.access;
        state.sellerRefresh =  action.payload.vendor_tokens.refresh;
        localStorage.setItem("sellerAccess", action.payload.vendor_tokens.access);
        localStorage.setItem("sellerRefresh", action.payload.vendor_tokens.refresh);
      })
      .addCase(sellerLogin.rejected, (state, action) => {
        state.sellerAuthenticated = false;
        state.loading = false;
        state.error = action.payload;
        state.sellers = []
      })
      .addCase(loadDashboard.pending, (state) =>{
        state.loading = true;
      })
      .addCase(loadDashboard.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(("dashboard payload...", action.payload));
        state.sellers = action.payload;
        state.error = null;
      })
      .addCase(loadDashboard.rejected, (state, action) => {
        state.loading = false;
        // console.log("dashboard errror...", action)
        state.error = action.payload;
        state.sellers = []
      })
      .addCase(loadProductList.pending, (state) =>{
        state.loading = true;
      })
      .addCase(loadProductList.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.error = null;
      })
      .addCase(loadProductList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.list = []
      })

      .addCase(getOrders.pending, (state) =>{
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.orders = []
      })

      .addCase(getOrderDetails.pending, (state) =>{
        state.loading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.order_data = action.payload;
        state.error = null;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.order_data = []
      })

      .addCase(UpdateOrderStatus.pending, (state) =>{
        state.loading = true;
      })
      .addCase(UpdateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.res = action.payload;
        state.error = null;
      })
      .addCase(UpdateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.res = []
      })

      .addCase(filterOrder.pending, (state) =>{
        state.loading = true;
      })
      .addCase(filterOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(filterOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.orders = []
      })
  }
});

export const {  } = sellerSlice.actions;

export default sellerSlice.reducer;