import fetchAccessToken from "./fetchAccessToken";
import authCountdown from "./authCountdown";

const authCheck = async (state, dispatch) => {
    try {
        // console.log(`Authentication check in progress...`)
        const accessToken = await fetchAccessToken()

        if(accessToken){
            dispatch({type:'SET_AUTHENTICATED',payload:true})
            dispatch({type:'SET_ACCESS_TOKEN',payload: accessToken})
        }
        authCountdown(state, dispatch, accessToken)
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