import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token_type: "",
  token: "",
  authenticated: false, 
  isLoading: true
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.token_type = action.payload.token_type;
      state.token = action.payload.token;
      state.authenticated = true;
      state.isLoading = false;
    },
    logout : (state) => {
      state.token_type = "";
      state.token = "";
      state.authenticated = false;
      state.isLoading = false;
    }
  },
})

// Action creators are generated for each case reducer function
export const authActions = authSlice.actions

export const selectAuth = (state) => state.auth

export default authSlice.reducer