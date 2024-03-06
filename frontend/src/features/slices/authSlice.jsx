import { createSlice } from '@reduxjs/toolkit';
import { laodProfile, signin, signup, refreshToken , signout, GoogleAuth, updateProfile, deleteAccount} from '../actions/authActions';

const initialState = {
  access: localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh'),
  isAuthenticated : false,
  loading: true,
  user : [],
  data : [],
  error : null, 
  current : "", 
  previous : ""
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    userLogin : (state, action) => { 
        state.isAuthenticated = true;
        state.loading = false;
        localStorage.setItem('access', action.payload.token.access);
        localStorage.setItem('refresh', action.payload.token.refresh);
    },
    redirect: (state, action) => {
      state.previous = state.current;
      state.current = action.payload.pathname;
    },
  },
  
  extraReducers(builder) {
    builder

    .addCase(GoogleAuth.pending, (state) =>{
      state.loading = true;
    })
    .addCase(GoogleAuth.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.access = action.payload.access_token;
      state.refresh = action.payload.refresh_token;
      state.user = action.payload.user;
      localStorage.setItem('access', action.payload.access_token);
      localStorage.setItem('refresh', action.payload.refresh_token);
    })
    .addCase(GoogleAuth.rejected, (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
      
    })


    .addCase(refreshToken.pending, (state) => {
     state.loading = true;
    })
    .addCase(refreshToken.fulfilled, (state, action) => {
      state.access = action.payload;
      state.isAuthenticated = true;
    })
    .addCase(refreshToken.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.error = action.payload

    })
      .addCase(laodProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(laodProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        if(state.user.errors){
          state.isAuthenticated = false
        }
      })
      .addCase(laodProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false
       
      })
      .addCase(signup.pending, (state) =>{
        state.loading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(signin.pending, (state) =>{
        state.loading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.access = action.payload.token.access
        state.refresh = action.payload.token.refresh
        localStorage.setItem('access', action.payload.token.access);
        localStorage.setItem('refresh', action.payload.token.refresh);
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
        // localStorage.clear();
      })
      
      .addCase(signout.pending, (state) =>{
        state.loading = true;
        localStorage.clear();
      })
      .addCase(signout.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.access = "";
        state.refresh = "";
        state.user = [];
        state.data = [];
        localStorage.clear();
        // localStorage.setItem('access', "");
        // localStorage.setItem('refresh', "");
      })
      .addCase(signout.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      .addCase(updateProfile.pending, (state) =>{
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteAccount.pending, (state) =>{
        state.loading = true;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.loading = false;
        state.access = ""
        state.refresh = ""
        state.user = [];
        state.data = [];
        localStorage.clear();
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
  }
});

export const { userLogin, loginFailed, userLoading, redirect } = authSlice.actions;

export default authSlice.reducer;