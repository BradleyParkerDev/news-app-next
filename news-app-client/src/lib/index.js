// index.js
import 	authCheck from './auth/authCheck';
import  fetchAccessToken  from './auth/fetchAccessToken';
import  loginUser  from './auth/loginUser';
import  logoutUser  from './auth/logoutUser';
import  registerUser  from './auth/registerUser';
import  setHeaderToken  from './auth/setHeaderToken';
import  fetchUserData  from './data/fetchUserData';
import  fetchNews  from './data/fetchNews';
import  setLocalStorageData from './data/setLocalStorageData';
import 	getLocalStorageData from './data/getLocalStorageData';
import  createNewsObject from './data/createNewsObject';
import  uploadImage from './data/uploadImage';
import  updateUserData from './data/updateUserData';
import  deleteUser from './data/deleteUser';
import cn from './ui/cn';

// Export the functions
export {
	authCheck,
	fetchAccessToken,
	loginUser,
	logoutUser,
	registerUser,
	setHeaderToken,
	fetchUserData,
	fetchNews,
	setLocalStorageData,
	getLocalStorageData,
	createNewsObject,
	uploadImage,
	updateUserData,
	deleteUser,
	cn
};
