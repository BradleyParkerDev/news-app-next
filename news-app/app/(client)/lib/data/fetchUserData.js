"use client";

import axios from "axios";
import getLocalStorageData from "./getLocalStorageData";
import setLocalStorageData from "./setLocalStorageData";
const urlEndPoint = process.env.NEXT_PUBLIC_BASE_URL;

const fetchUserData = async () => {
    try {
        console.log('Checking local storage...');
        let localUserData = getLocalStorageData('user');
        console.log(axios.defaults.headers.common['Authorization'])

        if (!localUserData) {
            console.log('Fetching user data from the server...');
            const response = await axios.get(`${urlEndPoint}/users/get-user`);
            const serverUserData = await response.data.user;
            console.log(serverUserData);
            
            setLocalStorageData('user',serverUserData)
            return await serverUserData;
        }

        console.log('Comparing local storage and server data...');
        const response = await axios.get(`${urlEndPoint}/users/get-user`);
        console.log(response)
        const serverUserData = response.data.user;

        if (serverUserData.lastUpdated > localUserData.lastUpdated) {
            // console.log('Server data is more recent, updating local storage...');
            return serverUserData;
        } else {
            // console.log('Local storage data is up-to-date.');
            return localUserData;
        }
    } catch (error) {
        console.log(`Error fetching user data: ${error}`);
    }
};

export default fetchUserData;
