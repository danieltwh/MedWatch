import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/authSlice"
import heartrateReducer from "../features/heartrateSlice"
import patientsSlice from 'features/patientsSlice'
import caloriesSlice from 'features/caloriesSlice'

import storage from 'redux-persist/lib/storage'
// import { persistReducer, persistStore } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
// import thunk from "redux-thunk";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: "root",
  storage,
  // stateReconciler: autoMergeLevel2,
}

const rootReducer = combineReducers({
  auth: authReducer,
  heartrate: heartrateReducer,
  patients: patientsSlice,
  calories: caloriesSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  // reducer: rootReducer,
  reducer: persistedReducer,
  // middleware: [thunk],
  middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store);

