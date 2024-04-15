import styles from './NavBar.module.css'
import { useNavigate } from 'react-router-dom';

const NavBar = (props) => {

    const navigate = useNavigate();

    return (
        <div className={styles.container}>
            <div className={styles.innerContainer2}>
                <p className={styles.listItem} onClick={() => navigate('/')}>
                    Home
                </p>
                <p className={styles.listItem} onClick={() => navigate('/settings')}>
                    Settings
                </p>
            </div>
        </div>
    )
}

export default NavBar;
