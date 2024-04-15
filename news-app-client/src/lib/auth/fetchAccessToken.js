import axios from "axios";
import setHeaderToken from "./setHeaderToken";
import Cookies from "universal-cookie";
import logoutUser from "./logoutUser";
import { jwtDecode } from "jwt-decode";

const urlEndPoint = process.env.REACT_APP_BASE_URL;

const fetchAccessToken = async () => {
    try {
        const cookies = new Cookies();
        let accessToken = cookies.get('accessToken');
        let refreshToken = cookies.get('refreshToken');
        let user = localStorage.getItem('user')



        // Both the access token  and refresh token were not found in cookies
        if (!accessToken && !refreshToken) {

            // if user in local storage wait a few seconds and retry token fetch
            // if(user){
            //     setTimeout(()=>{
            //         return
            //         accessToken = cookies.get('accessToken');
            //         refreshToken = cookies.get('refreshToken');
            //     },3000)
            // }

            // // if tokens still not found but user is, remove user from local storage
            // if((!accessToken && !refreshToken) && user){
                console.log('Neither access token nor refresh token found in cookies.');
                localStorage.removeItem('user')  
                return;                
            // }

        }

        // The access token was found in cookies
        if (!accessToken) {

            try {
                console.log('Access token not found in cookies. Refreshing...');
                const response = await axios.post(`${urlEndPoint}/users/refresh-access-token`, { refreshToken });
                accessToken = response.data.accessToken;
                refreshToken = response.data.newRefreshToken;

                const decodedAccessToken = jwtDecode(accessToken);
                const decodedRefreshToken = jwtDecode(refreshToken);

                // Calculate the expiration time in milliseconds
                const accessTokenExp = (decodedAccessToken.exp - decodedAccessToken.iat) * 1000;
                // Set the access token cookie with expiration time
                cookies.set('accessToken', accessToken, { expires: new Date(Date.now() + accessTokenExp) });

                // Calculate the expiration time in milliseconds
                const refreshTokenExp = (decodedRefreshToken.exp - decodedRefreshToken.iat) * 1000;
                // Set the refresh token cookie with expiration time
                cookies.set('refreshToken', refreshToken, { expires: new Date(Date.now() + refreshTokenExp) });                
            } catch (error) {
                if (error.response && error.response.status === 500) {
                    console.log('Error fetching access token.');
                }       
                throw error; // Re-throw the error to handle it in the calling function
            }

        } else {
            console.log('Using access token from cookies.');
        }

        setHeaderToken(accessToken);

        return accessToken;
    } catch (error) {
        console.error('Error fetching/accessing access token:', error);
        if (error.response && error.response.status === 403) {
            console.log('Invalid refresh token. Logging out...');
            localStorage.removeItem('user')
        }

        throw error; // Re-throw the error to handle it in the calling function
    }
};

export default fetchAccessToken;