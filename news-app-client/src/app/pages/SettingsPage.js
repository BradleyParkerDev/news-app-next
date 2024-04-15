import styles from './SettingsPage.module.css';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { AuthContext } from '../../context/AuthContext';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import { logoutUser, fetchAccessToken, fetchUserData, deleteUser } from '../../lib';
import { uploadImage, updateUserData } from '../../lib';
import maleUserImage from '../../assets/images/male_user_image_1.jpg';
import {useNavigate} from 'react-router-dom';
import UpdateUserForm from '../../components/UpdateUserForm/UpdateUserForm';
const SettingsPage = (props) => {
    const navigate = useNavigate();
    const { state: userState, dispatch: userDispatch } = useContext(UserContext);
    const { state: authState, dispatch: authDispatch } = useContext(AuthContext);


    const {id, firstName, lastName, emailAddress, userLoading, userImage} = userState;
    const { accessToken, isAuth, authLoading } = authState;
    const [imageUrl, setImageUrl] = useState('');
    const [imageFile, setImageFile] = useState('');

    const handleLogout = () => {
        logoutUser(authDispatch);
        navigate('/')
    };

    const handleFetchUserData = async () => {
        const userData = await fetchUserData();
        userDispatch({ type: 'FETCH_USER_DATA', payload: userData });
    };

    const handleRefreshAccessToken = () => {
        fetchAccessToken();
    };

    const handleDeleteUser = () => {

        deleteUser()
        navigate('/')

    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
    };

    const handleImageUpload = async () => {
        try {
            const uploadedUrl = await uploadImage(id, imageFile);
            await updateUserData({userImage: uploadedUrl})
            console.log("Uploaded image URL: ", uploadedUrl);
        } catch (error) {
            console.error("Error uploading image: ", error);
        }
    };
    const showLoginRegister = () =>{

        return(
        <div>
            <LoginForm />
            <br />
            <RegistrationForm />
        </div>
        )
    }

    const showUserInfo = () =>{

        return(
            <div>
                <h1>Current User:</h1>
                <p>Fullname: {firstName} {lastName}</p>
                <p>Email Address: {emailAddress}</p>
                <p>isAuth: {JSON.stringify(isAuth)}</p>
                <p>Access Token: {JSON.stringify(accessToken)}</p>
                <br/>
                <UpdateUserForm />
            </div>
        )
    }

    return (
        <div>
            SettingsPage
            <br />
            <input type="file" accept="image/*" onChange={handleImageChange} />

            {userLoading === false && <img className={styles.imageSize} src={imageUrl} alt="Upload Image" />}
            <br/>
            {userLoading === false && <img className={styles.imageSize} src={userImage} alt="User Image" />}

            {userLoading === false && showUserInfo()}
            <br />
            <div className={styles.buttonContainerDiv}>
                {isAuth === true && <button onClick={handleLogout}>Logout</button>}
                {isAuth === true && <button onClick={handleDeleteUser}>Delete User</button>}

                <button onClick={handleFetchUserData}>Fetch User Data</button>
                <button onClick={handleRefreshAccessToken}>Refresh Access Token</button>
                <button onClick={handleImageUpload}>Upload Image</button>
            </div>
            {isAuth === false && showLoginRegister()}

        </div>
    );
};

export default SettingsPage;
