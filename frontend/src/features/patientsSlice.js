import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  status: "idle"
}

export const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    set: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.data = action.payload;
    //   state.status = "success"
    },
    reset : (state) => {
        state.data = [];
        // state.status = "idle"
    }
  },
})

// Action creators are generated for each case reducer function
export const patientsActions = patientsSlice.actions

export const selectPatients = (state) => state.patients

export default patientsSlice.reducer