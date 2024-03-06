import { createSlice } from '@reduxjs/toolkit';
import { createCategory, loadCategory, updateCategory } from '../actions/categoryActions';


const initialState = {
    loading : true,
    data : [],
    error : null
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {    
  },
  
  extraReducers(builder) {
    builder
      .addCase(loadCategory.pending, (state) =>{
        state.loading = true;
      })
      .addCase(loadCategory.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(action.payload)
        state.data = action.payload.data;
        state.error = null;
      })
      .addCase(loadCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createCategory.pending, (state) =>{
        state.loading = true;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload.data);
        state.error = null;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCategory.pending, (state) =>{
        state.loading = true;
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }) 
  }
});

export const {  } = categorySlice.actions;

export default categorySlice.reducer;