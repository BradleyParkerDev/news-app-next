import useForm from "../../hooks/useForm"
import { updateUserData } from "../../lib";
import styles from "./UpdateUserForm.module.css"
const UpdateUserForm = (props) =>{
    const {formData, handleChange, resetForm} = useForm({
        firstName:'',
        lastName:'',
        emailAddress:'',
        password:''
    });

    const handleSubmit = (e) =>{
        e.preventDefault();
        try {
            updateUserData(formData)
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
                <button type='submit'>Update</button>
            </form>

        </div>

    );

}

export default UpdateUserForm;