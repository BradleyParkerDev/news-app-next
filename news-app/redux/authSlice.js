'use client';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuth: false,
    accessToken: '',
    authLoading: true,
    authCountdown: false,
    abortCountdown: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthenticated: (state, action) => {
            state.isAuth = action.payload.isAuth;
            state.authLoading = false;
        },
        setAccessToken: (state, action) => {
            state.accessToken = action.payload.accessToken;
        },
        setAuthCountdown: (state, action) => {
            state.authCountdown = action.payload.authCountdown;
        },
        abortAuthCountdown: (state, action) => {
            state.abortCountdown = action.payload;
        },
    },
});



export const { setAuthenticated, setAccessToken, setAuthCountdown, abortAuthCountdown } = authSlice.actions;

export default authSlice.reducer;
