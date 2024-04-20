"use client";

import axios from "axios"


const setHeaderToken = (token) => {
    if(token){
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        console.log('Authorization headers set!')
        console.log(axios.defaults.headers.common['Authorization'])
    }else{
        delete axios.defaults.headers.common['Authorization'];
    }

}

export default setHeaderToken;