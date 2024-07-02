import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import storage from 'reduxjs-toolkit-persist/lib/storage'
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import breadcrumbReducer from './slices/breadcrumbSlice';
import loginReducer from './slices/loginSlice';
import pickupReducer from './slices/pickupSlice';
import areaReducer from './slices/areaSlice';
import zoneReducer from './slices/zoneSlice';
import branchReducer from './slices/branchSlice';
import dashboardReducer from './slices/dashboardSlice';
import marchantReducer from './slices/marchantSlice';
import orderReducer from './slices/orderSlice';
import orderDetailsReducer from './slices/orderDetailsSlice';
import transportReducer from './slices/transportSlice';
import deliveryReducer from './slices/deliverySlice';
import paymentReducer from './slices/paymentSlice';


const isClient = typeof window !== "undefined";

import { combineReducers } from "redux";

const persistConfig ={
    key : "root",
    // storage :AsyncStorage
     storage 
}

const reducer = combineReducers({
    // put all your reducers here!
    breadcrumbReducer: breadcrumbReducer,
    loginReducer :  loginReducer,
    pickupReducer : pickupReducer,
    areaReducer : areaReducer,
    zoneReducer  : zoneReducer,
    branchReducer : branchReducer,
    dashboardReducer : dashboardReducer,
    marchantReducer : marchantReducer,
    orderReducer : orderReducer,
    orderDetailsReducer : orderDetailsReducer,
    transportReducer : transportReducer,
    deliveryReducer : deliveryReducer,
    paymentReducer : paymentReducer
});



const persistedReducer =  persistReducer(persistConfig,reducer)

export const store = configureStore({
    reducer : persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
}); 
