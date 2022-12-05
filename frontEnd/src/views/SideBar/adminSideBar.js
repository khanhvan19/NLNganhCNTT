import styles from './SideBar.module.css'
import Accordion from '../../components/Accordion/accordion'
import { constants } from '../../stores'
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";

function AdminSilderBar() {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>
                <img src='/images/logo-vbook.png' alt='' className='w-75 mb-4'/>
            </div>
            <div>
                <Accordion items={constants.ADMIN_SIDEBAR} icon={faChevronUp}/>
            </div>
        </div>
    );
}

export default AdminSilderBar;