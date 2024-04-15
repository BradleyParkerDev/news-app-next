import { jwtDecode } from "jwt-decode";

const authCountdown = async (state, dispatch, accessToken) => {
  if (state.authCountdown === false) {
    dispatch({ type: 'SET_AUTH_COUNTDOWN', payload: true });
    const decodedAccessToken = jwtDecode(accessToken);
    let accessTokenExp = (decodedAccessToken.exp - decodedAccessToken.iat) * 1000;

    // Define intervalId outside the if block
    let intervalId;

    // Function to update and display the countdown
    const updateCountdown = () => {
		accessTokenExp -= 1000;
		let seconds = accessTokenExp / 1000;
		if (Number.isInteger(seconds) && seconds > 0) {
		// console.log(`Access token expires in ${seconds} seconds`);
		if (state.abortCountdown) {
			console.log('abort')
			seconds = 0;
			clearInterval(intervalId);
			dispatch({ type: 'SET_AUTH_COUNTDOWN', payload: false }); // Reset the countdown state
			return;
		}
		}

		if (accessTokenExp <= 0) {
		clearInterval(intervalId);
		console.log('Access token has expired!');
		dispatch({ type: 'SET_ACCESS_TOKEN', payload: '' });
		}
    };

    // Start the countdown
    intervalId = setInterval(updateCountdown, 1000);

    dispatch({ type: 'SET_AUTH_COUNTDOWN', payload: false });

  } else {
    console.log('authCountdown currently running...');
  }
};

export default authCountdown;
