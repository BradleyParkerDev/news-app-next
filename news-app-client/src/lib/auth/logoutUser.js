import axios from "axios";

import Cookies from 'universal-cookie'

const logoutUser = (authDispatch) =>{
    const cookies = new Cookies();
    console.log('aborting auth countdown.')
    // authDispatch({type:'ABORT_AUTH_COUNTDOWN', payload: true})
   
    console.log('logging user out...');

    cookies.remove('refreshToken');
    cookies.remove('accessToken');
    localStorage.removeItem('user');
    localStorage.removeItem('news');
    localStorage.removeItem('weather');

    delete axios.defaults.headers.common['Authorization'];
    // alert('User logged out!')

}

export default logoutUser;