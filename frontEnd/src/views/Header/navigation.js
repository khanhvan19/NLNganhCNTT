import { Link } from 'react-router-dom'

import styles from './Header.module.css'

function Navigation() {
    return (
        <>
            <Link to='/' className={styles.navLink}>Home</Link>
            <Link to='/product' className={styles.navLink}>Product</Link>
            <Link to='/contact' className={styles.navLink}>Contact</Link>
        </>
    );
}

export default Navigation;