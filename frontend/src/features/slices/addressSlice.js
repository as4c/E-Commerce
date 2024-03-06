import { createSlice } from '@reduxjs/toolkit';
import { createAddress, deleteAddress, loadAddress, updateAddress } from '../actions/addressAction';


const initialState = {
    loading : true,
    address : [],
    error : null
};

const addressSlice = createSlice({
  name : 'address',
  initialState,
  reducers: {    
  },
  
  extraReducers(builder) {
    builder
      .addCase(loadAddress.pending, (state) =>{
        state.loading = true;
      })

      .addCase(loadAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.address = action.payload;
        state.error = null;
      })

      .addCase(loadAddress.rejected, (state, action) => {
        state.loading = false;
        state.data = []
        state.error = action.payload ? action.payload.message : "An error occurred while adding to address.";
      })

      .addCase(createAddress.pending, (state) =>{
        state.loading = true;
      })

      .addCase(createAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(createAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : "An error occurred while adding to address.";
        // console.error("Error adding to cart:", action.payload);
      })
      
      .addCase(deleteAddress.pending, (state) =>{
        state.loading = true;
      })
      
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        // console.log("payload...", action.payload)
        state.error = null;
      })

      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }) 
  }
});

export const {  } = addressSlice.actions;

export default addressSlice.reducer;