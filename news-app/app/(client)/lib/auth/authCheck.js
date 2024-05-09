"use client";

import fetchAccessToken from "./fetchAccessToken";
import authCountdown from "./authCountdown";
import {setAuthenticated, setAccessToken} from "@redux/authSlice";

const authCheck = async (dispatch, auth) => {
    try {
        // console.log(`Authentication check in progress...`)
        const accessToken = await fetchAccessToken()

        if(accessToken){
            dispatch(setAuthenticated({payload:true}))
            dispatch(setAccessToken({payload: accessToken}))
        }
        authCountdown(dispatch,auth, accessToken)
    } catch (error) {
        if (error.response && error.response.status === 403) {
            console.log('Old refresh token is not valid.');
            localStorage.removeItem('user')
        }
        if (error.response && error.response.status === 500) {
            console.log('Error fetching access token.');
        }       
        throw error; // Re-throw the error to handle it in the calling function
    }


};

export default authCheck;