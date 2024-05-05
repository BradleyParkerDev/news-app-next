'use client';
import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import userReducer from './userSlice'
import newsReducer from './newsSlice'

const makeStore  = () => {
    return configureStore({
        reducer: {
            auth: authReducer,
            user: userReducer,
            news: newsReducer
        }
    })    
}

export default makeStore;
