import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  currentUser: null,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.currentUser = null;
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    updateUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
    resetState: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    }
  }
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateUser,
  resetState
} = userSlice.actions;

// FIXED: Check authentication status - The main fix!
export const checkAuthStatus = () => async (dispatch) => {
  try {
    dispatch(loginStart());
    
    const response = await axios.get(
      'http://localhost:5000/api/auth/check',
      { 
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    
    
    if (response.data.authenticated && response.data.user) {
      // Backend returns: { authenticated: true, user: { _id, name, email, role, ... } }
      // Frontend expects: currentUser.user.role
      // So we wrap it: { user: { _id, name, email, role, ... } }
      
      const userData = { user: response.data.user };
      
      console.log('User data from auth check:///', response.data.user);
      
      console.log('User data from auth check:', userData);

      
      dispatch(loginSuccess(userData));
      return userData;
    } else {
      dispatch(logout());
      return null;
    }
  } catch (error) {
    console.error('Error checking auth status:', error);
    
    // Handle token expiration
    if (error.response?.data?.tokenExpired) {
      console.log('Token expired, attempting refresh...');
      try {
        const refreshResponse = await axios.post(
          'http://localhost:5000/api/auth/refresh',
          {},
          { withCredentials: true }
        );
        
        if (refreshResponse.data.success) {
          // Retry auth check after refresh
          return dispatch(checkAuthStatus());
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
      }
    }
    
    dispatch(logout());
    return null;
  }
};



export default userSlice.reducer;