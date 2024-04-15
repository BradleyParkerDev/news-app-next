import { useContext } from "react";
import useForm from "../../hooks/useForm";
import { UserContext } from "../../context/UserContext";
import React from "react";
import styles from './RegistrationForm.module.css'
import { registerUser } from "../../lib";
const RegistrationForm = (props) =>{

    const {formData, handleChange, resetForm} = useForm({
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: ''
    });

    const handleSubmit = (e) =>{
        e.preventDefault();
        try {
            registerUser(formData)
            console.log('RegistrationForm data submitted:', formData)
        } catch (error) {
            
        }
        resetForm();
    }
 
    return(
        <div className={styles.container}>

            <form  onSubmit={handleSubmit}>
                <label>First Name</label>
                <input
                    type='text'
                    name='firstName'
                    value = {formData.firstName}
                    onChange={handleChange}
                
                />
                <label>Last Name</label>
                <input
                    type='text'
                    name='lastName'
                    value = {formData.lastName}
                    onChange={handleChange}
                
                />
                <label>Email Address</label>
                <input
                    type='email'
                    name='emailAddress'
                    value = {formData.emailAddress}
                    onChange={handleChange}
                
                />
                <label>Password</label>
                <input
                    type='text'
                    name='password'
                    value = {formData.password}
                    onChange={handleChange}
                
                />
                <button type='submit'>Submit</button>
            </form>

        </div>

    );
}

export default RegistrationForm;