import { createSlice } from '@reduxjs/toolkit';
import { addToCart, loadCart, removeFromCart } from '../actions/cartAction';


const initialState = {
    loading : true,
    data : [],
    error : null
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {    
  },
  
  extraReducers(builder) {
    builder
      .addCase(loadCart.pending, (state) =>{
        state.loading = true;
      })

      .addCase(loadCart.fulfilled, (state, action) => {
        state.loading = false;
        // console.log("cart data...", action.payload);
        state.data = action.payload;
        state.error = null;
      })

      .addCase(loadCart.rejected, (state, action) => {
        state.loading = false;
        state.data = []
        state.error = action.payload ? action.payload.message : "An error occurred while adding to cart.";
      })

      .addCase(addToCart.pending, (state) =>{
        state.loading = true;
      })

      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : "An error occurred while adding to cart.";
        // console.error("Error adding to cart:", action.payload);
      })
      
      .addCase(removeFromCart.pending, (state) =>{
        state.loading = true;
      })
      
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        // console.log("payload...", action.payload)
        state.error = null;
      })

      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }) 
  }
});

export const {  } = cartSlice.actions;

export default cartSlice.reducer;