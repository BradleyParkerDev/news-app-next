import { useContext } from "react";
import useForm from "../../hooks/useForm";
import { AuthContext } from "../../context/AuthContext";
import {UserContext} from "../../context/UserContext"
import { loginUser } from "../../lib/";
import styles from './LoginForm.module.css'

const LoginForm = () =>{
    const { dispatch: userDispatch} = useContext(UserContext);
    const { state,  dispatch} = useContext(AuthContext);

    const {formData, handleChange, resetForm} = useForm({
        emailAddress:'',
        password:''
    });

    const handleSubmit = (e) =>{
        e.preventDefault();

        try {
            loginUser(formData, userDispatch , state , dispatch); // Corrected userDispatch argument
        } catch (error) {
            console.error('Error logging in user:', error);
        }

        resetForm();
    }

    return(
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <label>Email Address</label>
                <input
                    type='email'
                    name='emailAddress'
                    value={formData.emailAddress}
                    onChange={handleChange}
                />
                <label>Password</label>
                <input
                    type='password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                />
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default LoginForm;
