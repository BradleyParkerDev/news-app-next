'use client';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id:'',
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    userImage:'',
    readLater: [], 
    userLoading: true 
};


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (action) => {
            return { ...action.payload, userLoading: false };
        },
        addRemoveReadLaterArticle: (state, action) => {
            if(action.type === 'add'){
                state.readLater.push(action.payload);
            }
            if(action.type === 'remove'){

            }            
        },

        resetUser: () => {
            return initialState;
        },
    },
});

export const { setUserData, addRemoveReadLaterArticle, resetUser } = userSlice.actions;

export default userSlice.reducer;
