"use client";

import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector} from 'react-redux';
import authSlice, {setAuthenticated, setAccessToken, setAuthCountdown} from "@redux/authSlice";

const authCountdown = async (dispatch, auth, accessToken) => {


	if (auth.authCountdown === false && accessToken) {


		dispatch(setAuthCountdown({ authCountdown: true }));

		const decodedAccessToken = jwtDecode(accessToken);
		let accessTokenExp = (decodedAccessToken.exp - decodedAccessToken.iat) * 1000;

		// Define intervalId outside the if block
		let intervalId;

		// Function to update and display the countdown
		const updateCountdown = () => {
			accessTokenExp -= 1000;
			let seconds = accessTokenExp / 1000;
			if (Number.isInteger(seconds) && seconds > 0) {
			console.log(`Access token expires in ${seconds} seconds`);
			if (auth.abortCountdown) {
				console.log('abort')
				seconds = 0;
				clearInterval(intervalId);
				dispatch(setAuthCountdown({ authCountdown: false })); // Reset the countdown state
				return;
			}
			}

			if (accessTokenExp <= 0) {
			clearInterval(intervalId);
			console.log('Access token has expired!');
			dispatch(setAccessToken({accessToken: '' }));
			}
		};

		// Start the countdown
		intervalId = setInterval(updateCountdown, 1000);

		dispatch(setAuthCountdown({ authCountdown: false }));

	} else {
		console.log('authCountdown currently running...');
	}
};

export default authCountdown;
