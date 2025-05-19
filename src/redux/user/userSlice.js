import { createSlice } from '@reduxjs/toolkit';

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

// Thunk for checking authentication status
export const checkAuthStatus = () => async (dispatch) => {
  try {
    const response = await fetch('/api/auth/check-auth', {
      credentials: 'include', // Important for cookies
    });
    
    if (response.ok) {
      const data = await response.json();
      dispatch(loginSuccess(data.user));
    } else {
      dispatch(logout());
    }
  } catch (error) {
    console.error('Error checking auth status:', error);    
    dispatch(logout());
  }
};

// Thunk for logging out
export const logoutUser = () => async (dispatch) => {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    dispatch(logout());
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export default userSlice.reducer;