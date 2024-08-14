



"use client";

import { useState } from 'react';

import { logoutUser, fetchAccessToken, fetchUserData, deleteUser } from '@client/lib';

import { Button } from '@client/components/ui/button';
import { Avatar , AvatarFallback, AvatarImage } from '@client/components/ui/avatar';

import { useSelector, useDispatch } from 'react-redux';



import LoginForm from "@client/components/LoginForm/LoginForm";
import RegistrationForm from '@client/components/RegistrationForm/RegistrationForm';
import UpdateForm from '@client/components/UpdateForm/UpdateForm';
import { setUserData } from '@redux/userSlice';


const UserPage = () =>{
	const dispatch = useDispatch()

	const auth = useSelector((state) => state.auth)
	const user = useSelector((state) => state.user)


    const {id, firstName, lastName, emailAddress, userLoading, userImage} = user;
    const { accessToken, isAuth, authLoading } = auth;
    const [imageFile, setImageFile] = useState('');
	// Implementing window Check
	// if (typeof window !== "undefined") {
		// Page rendered only if window is defined
		const showUserInfo = () =>{

			return(
				<div>
					<Avatar>
						<AvatarImage src={userImage} />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<h1>Current User:</h1>
					<p>Fullname: {firstName} {lastName}</p>
					<p>Email Address: {emailAddress}</p>
					<p>isAuth: {JSON.stringify(isAuth)}</p>
					<p>Access Token: {JSON.stringify(accessToken)}</p>
					<br/>
					{/* <UpdateUserForm /> */}
				</div>
			)
		}


		const handleRefreshAccessToken = () => {
			fetchAccessToken();
		};
		const handleFetchUserData = async () => {
			const userData = await fetchUserData();
			console.log(userData)
			dispatch(setUserData({ user: userData }));
		};
		const handleLogout = () => {
			logoutUser(dispatch);

		};
		const handleDeleteUser = () => {
			deleteUser();
			logoutUser(dispatch);
		};

		return(
			<div className="pl-[200px]">
				{isAuth  && <UpdateForm/>}

				<br/>
				{isAuth === false && <RegistrationForm/>}
				<br/>
				{isAuth === false && <LoginForm/>}
				<br/>
				<br/>
				{isAuth  && <Button onClick={handleRefreshAccessToken}>Refresh Access Token</Button>} 
				<br/>
				<br/>

				{isAuth  && <Button onClick={handleFetchUserData}>Fetch User Data</Button>} 
				<br/>
				<br/>
				{isAuth  && <Button onClick={handleLogout}>Logout</Button>}
				<br/>
				<br/>
				{isAuth  && <Button onClick={handleDeleteUser}>Delete User</Button>}
				<br/>
				<br/>
				{userLoading === false && showUserInfo()}
			</div>
		);
	// }
}

export default UserPage;



// import { uploadImage, updateUserData } from '../../lib';
// import {useNavigate} from 'react-router-dom';
// import UpdateUserForm from '../../components/UpdateUserForm/UpdateUserForm';

// const settings = (props) => {
//     const navigate = useNavigate();
//     const { state: userState, dispatch: userDispatch } = useContext(UserContext);
//     const { state: authState, dispatch: authDispatch } = useContext(AuthContext);


//     const {id, firstName, lastName, emailAddress, userLoading, userImage} = userState;
//     const { accessToken, isAuth, authLoading } = authState;
//     const [imageUrl, setImageUrl] = useState('');
//     const [imageFile, setImageFile] = useState('');

//     const handleLogout = () => {
//         logoutUser(authDispatch);
//         navigate('/')
//     };

//     const handleFetchUserData = async () => {
//         const userData = await fetchUserData();
//         userDispatch({ type: 'FETCH_USER_DATA', payload: userData });
//     };



//     const handleDeleteUser = () => {

//         deleteUser()
//         navigate('/')

//     }

//     const handleImageChange = (event) => {
//         const file = event.target.files[0];
//         setImageFile(file);
//     };

//     const handleImageUpload = async () => {
//         try {
//             const uploadedUrl = await uploadImage(id, imageFile);
//             await updateUserData({userImage: uploadedUrl})
//             console.log("Uploaded image URL: ", uploadedUrl);
//         } catch (error) {
//             console.error("Error uploading image: ", error);
//         }
//     };
//     const showLoginRegister = () =>{

//         return(
//         <div>
//             <LoginForm />
//             <br />
//             <RegistrationForm />
//         </div>
//         )
//     }

//     const showUserInfo = () =>{

//         return(
//             <div>
//                 <h1>Current User:</h1>
//                 <p>Fullname: {firstName} {lastName}</p>
//                 <p>Email Address: {emailAddress}</p>
//                 <p>isAuth: {JSON.stringify(isAuth)}</p>
//                 <p>Access Token: {JSON.stringify(accessToken)}</p>
//                 <br/>
//                 <UpdateUserForm />
//             </div>
//         )
//     }

//     return (
//         <div>
//             SettingsPage
//             <br />
//             <input type="file" accept="image/*" onChange={handleImageChange} />

//             {userLoading === false && <img className={styles.imageSize} src={imageUrl} alt="Upload Image" />}
//             <br/>
//             {userLoading === false && <img className={styles.imageSize} src={userImage} alt="User Image" />}

//             {userLoading === false && showUserInfo()}
//             <br />
//             <div className={styles.buttonContainerDiv}>
//                 {isAuth === true && <button onClick={handleLogout}>Logout</button>}
//                 {isAuth === true && <button onClick={handleDeleteUser}>Delete User</button>}

//                 <button onClick={handleFetchUserData}>Fetch User Data</button>
//                 <button onClick={handleRefreshAccessToken}>Refresh Access Token</button>
//                 <button onClick={handleImageUpload}>Upload Image</button>
//             </div>
//             {isAuth === false && showLoginRegister()}

//         </div>
//     );
// };

// export default settings;
