// UserContext.js
import React, { createContext, useState, useReducer,useContext, useEffect} from 'react';
import { fetchUserData, setLocalStorageData, getLocalStorageData, authCheck} from '../lib';
import { AuthContext } from './AuthContext';

export const UserContext = createContext();




const initalState = {
    id:'',
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    userImage:'',
    readLater: [], 
    userLoading: true   
}

const userReducer = (state, action) => {
    switch(action.type) {
        case 'LOGIN':
            setLocalStorageData('user',action.payload)
            return {...action.payload, userLoading: false}
        case 'FETCH_USER_DATA': 
            return {...action.payload, userLoading: false}     
        case 'RESET_USER':
            return initalState;
        default:
            return state;
    }
}





export const UserProvider = ({ children }) => {
    const {state: authState, dispatch:authDispatch} = useContext(AuthContext)
    const {isAuth, accessToken} = authState;
    const [state,dispatch] = useReducer(userReducer,initalState)


    useEffect(() => {
        const setUserData = async () => {
            if(accessToken){
                try {
                    const user = await fetchUserData();
                    if (user) {
                        dispatch({ type: 'FETCH_USER_DATA', payload: user });
                    }                                       
        
                } catch (error) {
                    console.error('Error setting user data:', error);
                }   
                
                if(isAuth){
                    console.log(`isAuth: ${isAuth}`)
                }                
            }



        };
    
        setUserData();
        


    }, [isAuth, accessToken]);
    

    return (
        <UserContext.Provider value={{state, dispatch }}>
        {children}
        </UserContext.Provider>
    );
};

