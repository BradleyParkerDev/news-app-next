"use client";

import axios from "axios";
import authCountdown from "./authCountdown";
import setHeaderToken from "./setHeaderToken";
import fetchUserData from "../data/fetchUserData";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import authSlice, {setAuthenticated, setAccessToken} from "@redux/authSlice";
import { setUserData } from "@redux/userSlice";

const urlEndPoint = process.env.NEXT_PUBLIC_BASE_URL;




const loginUser = async (userData, dispatch) => {
    
    console.log('logging user in...')
    console.log(userData.emailAddress)
    try {
        const cookies = new Cookies();
        const response = await axios.post(`${urlEndPoint}/auth/login`, {
            emailAddress: userData.emailAddress,
            password: userData.password
        });
        const { accessToken, refreshToken } = response.data; 

        // Creating cookie for refreshToken
        const decodedRefreshToken = jwtDecode(refreshToken);
        const refreshExpirationTime = (decodedRefreshToken.exp - decodedRefreshToken.iat) * 1000;
        console.log(refreshExpirationTime)
        cookies.set('refreshToken', refreshToken,  { expires: new Date(Date.now() + refreshExpirationTime) }); 
        
        // Creating cookie for accessToken
        const decodedAccessToken = jwtDecode(accessToken);
        const accessExpirationTime = (decodedAccessToken.exp - decodedAccessToken.iat) * 1000;
        console.log(accessExpirationTime)
        cookies.set('accessToken', accessToken, { expires: new Date(Date.now() + accessExpirationTime) });

        
        if(accessToken) {
            setHeaderToken(accessToken);
            dispatch(setAuthenticated({payload:true}))
            dispatch(setAccessToken({payload: accessToken}))
            authCountdown(accessToken)
        } else {
            dispatch(setAuthenticated({payload:false}))
        }

        const user = await fetchUserData();

        if (user) {
            dispatch(setUserData({ payload: user }));
        }
    } catch (error) {
        console.error('Error logging in user:', error);
    }
};

export default loginUser;
