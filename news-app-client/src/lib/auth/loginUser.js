import axios from "axios";
import authCountdown from "./authCountdown";
import setHeaderToken from "./setHeaderToken";
import fetchUserData from "../data/fetchUserData";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
const urlEndPoint = process.env.REACT_APP_BASE_URL;
const loginUser = async (userData, userDispatch, state, dispatch) => {
    console.log('logging user in...')
    try {
        const cookies = new Cookies();
        const response = await axios.post(`${urlEndPoint}/users/login`, {
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

        
        if (accessToken) {
            setHeaderToken(accessToken);
            dispatch({ type: 'SET_AUTHENTICATED', payload: true });
            dispatch({ type: 'SET_ACCESS_TOKEN', payload: accessToken });
            authCountdown(state,dispatch,accessToken)

        } else {
            dispatch({ type: 'SET_AUTHENTICATED', payload: false });
        }

        const user = await fetchUserData();

        if (user) {
            userDispatch({ type: 'LOGIN', payload: user });
        }
    } catch (error) {
        console.error('Error logging in user:', error);
    }
};

export default loginUser;
