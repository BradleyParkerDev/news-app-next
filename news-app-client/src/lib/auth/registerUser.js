import axios from "axios";
const urlEndPoint = process.env.REACT_APP_BASE_URL;

const registerUser = async (userData) => {
    console.log('register user');
    try {
        const response = await axios.post(`${urlEndPoint}/users/register`, userData);
        console.log('User registered:', response.data);

    } catch (error) {
        console.error('Error registering user:', error);
    }
};

export default registerUser;