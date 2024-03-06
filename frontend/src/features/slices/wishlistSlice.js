import { createSlice } from '@reduxjs/toolkit';
import { addToWishlist, loadWishlist, removeFromWishlist } from '../actions/wishlistAction';


const initialState = {
    loading : true,
    data : [],
    error : null
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {    
  },
  
  extraReducers(builder) {
    builder
      .addCase(loadWishlist.pending, (state) =>{
        state.loading = true;
      })

      .addCase(loadWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })

      .addCase(loadWishlist.rejected, (state, action) => {
        state.loading = false;
        state.data = []
        state.error = action.payload ? action.payload.message : "An error occurred while adding to wishlist.";
      })

      .addCase(addToWishlist.pending, (state) =>{
        state.loading = true;
      })

      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : "An error occurred while adding to wishlist.";
        // console.error("Error adding to wishlist:", action.payload);
      })
      
      .addCase(removeFromWishlist.pending, (state) =>{
        state.loading = true;
      })
      
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }) 
  }
});

export const {  } = wishlistSlice.actions;

export default wishlistSlice.reducer;