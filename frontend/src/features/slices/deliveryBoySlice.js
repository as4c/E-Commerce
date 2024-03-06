import { createSlice } from '@reduxjs/toolkit';
import { 
    DeliveryBoyLogin, 
    createDeliveryBoyAccount, 
    getAllParcels, 
    getParcelDetails, 
    loadDeliveryBoyDashboard,
    DeliverOrPickupParcel
   
} from '../actions/deliveryBoyActions';
import { filterOrder } from '../actions/orderActions';

const initialState = {
    deliveryBoyAccess: localStorage.getItem('deliveryBoyAccess'),
    deliveryBoyRefresh: localStorage.getItem('deliveryBoyRefresh'),
    deliveryBoyAuthenticated : false,
    delivery_boy_loading : true,
    deliveryBoyData : [],
    order_list : [],
    order_data : [],
    status_res :[],
    error : null,
};

const deliveryBoySlice = createSlice({
  name: 'deliveryBoy',
  initialState,
  reducers: {
 
  },
  
  extraReducers(builder) {
    builder
      .addCase(createDeliveryBoyAccount.pending, (state) =>{
        state.delivery_boy_loading =  true;
      })
      .addCase(createDeliveryBoyAccount.fulfilled, (state, action) => {
        state.delivery_boy_loading =  false;
        state.deliveryBoyData = action.payload.data;
        state.error = null;
      })
      .addCase(createDeliveryBoyAccount.rejected, (state, action) => {
        state.delivery_boy_loading =  false;
        state.error = action.payload;
        state.deliveryBoyData = []
      })
      .addCase(DeliveryBoyLogin.pending, (state) =>{
        state.delivery_boy_loading =  true;
      })
      .addCase(DeliveryBoyLogin.fulfilled, (state, action) => {
        state.sellerAuthenticated = true;
        state.delivery_boy_loading =  false;
        state.deliveryBoyData = action.payload.data;
        state.error = null;
        state.deliveryBoyAccess  =  action.payload.delivery_boy_tokens.access;
        state.deliveryBoyRefresh =  action.payload.delivery_boy_tokens.refresh;
        localStorage.setItem("deliveryBoyAccess", action.payload.delivery_boy_tokens.access);
        localStorage.setItem("deliveryBoyRefresh", action.payload.delivery_boy_tokens.refresh);
      })
      .addCase(DeliveryBoyLogin.rejected, (state, action) => {
        state.sellerAuthenticated = false;
        state.delivery_boy_loading =  false;
        state.error = action.payload;
        state.deliveryBoyData = []
      })
      .addCase(loadDeliveryBoyDashboard.pending, (state) =>{
        state.delivery_boy_loading =  true;
      })
      .addCase(loadDeliveryBoyDashboard.fulfilled, (state, action) => {
        state.delivery_boy_loading =  false;
        state.order_list = action.payload;
        state.error = null;
      })
      .addCase(loadDeliveryBoyDashboard.rejected, (state, action) => {
        state.delivery_boy_loading =  false;
        state.error = action.payload;
        state.order_list = []
      })
    
      .addCase(getAllParcels.pending, (state) =>{
        state.delivery_boy_loading =  true;
      })
      .addCase(getAllParcels.fulfilled, (state, action) => {
        state.delivery_boy_loading =  false;
        state.order_list = action.payload;
        state.error = null;
      })
      .addCase(getAllParcels.rejected, (state, action) => {
        state.delivery_boy_loading =  false;
        state.error = action.payload;
        state.order_list = []
      })

      .addCase(getParcelDetails.pending, (state) =>{
        state.delivery_boy_loading =  true;
      })
      .addCase(getParcelDetails.fulfilled, (state, action) => {
        state.delivery_boy_loading =  false;
        state.order_data = action.payload;
        state.error = null;
      })
      .addCase(getParcelDetails.rejected, (state, action) => {
        state.delivery_boy_loading =  false;
        state.error = action.payload;
        state.order_data = []
      })

      .addCase(DeliverOrPickupParcel.pending, (state) =>{
        state.delivery_boy_loading =  true;
      })
      .addCase(DeliverOrPickupParcel.fulfilled, (state, action) => {
        state.delivery_boy_loading =  false;
        state.status_res = action.payload;
        state.error = null;
      })
      .addCase(DeliverOrPickupParcel.rejected, (state, action) => {
        state.delivery_boy_loading =  false;
        state.error = action.payload;
        state.status_res = []
      })


      .addCase(filterOrder.pending, (state) =>{
        state.delivery_boy_loading =  true;
      })
      .addCase(filterOrder.fulfilled, (state, action) => {
        state.delivery_boy_loading =  false;
        state.order_list = action.payload;
        state.error = null;
      })
      .addCase(filterOrder.rejected, (state, action) => {
        state.delivery_boy_loading =  false;
        state.error = action.payload;
        state.order_list = []
      })
  }
});

export const {  } = deliveryBoySlice.actions;

export default deliveryBoySlice.reducer;