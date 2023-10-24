import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/authSlice"
import heartrateReducer from "../features/heartrateSlice"
import patientsSlice from 'features/patientsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    heartrate: heartrateReducer,
    patients: patientsSlice
  },
})

