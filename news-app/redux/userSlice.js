'use client';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId: '',
    username: '',
    email: '',
    password: '',
    userImage: '',
    readLater: [],
    userLoading: true,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            return { ...action.payload, userLoading: false };
        },
        fetchUserData: (state, action) => {
            return { ...action.payload, userLoading: false };
        },
        addArticleToReadLater: (state, action) => {
            state.readLater.push(action.payload);
        },
        resetUser: (state) => {
            return initialState;
        },
    },
});

export const { login, fetchUserData, addArticleToReadLater, resetUser } = userSlice.actions;

export default userSlice.reducer;
