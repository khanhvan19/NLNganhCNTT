import { Link } from 'react-router-dom';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

import styles from './Card.module.css'

function MenuItem({ data, onClick=()=>{} }) {
    const itemClasses = [styles.menuItem];
    (data.separate) && itemClasses.push(styles.itemSeparate)

    return ( 
        <Link 
            to={data.to} 
            className={itemClasses.join(' ')} 
            onClick={onClick}
        >
            {data.icon && <Icon icon={data.icon} className={styles.iconItem}/>}
            <div>{data.name}</div>
        </Link>
    );
}

export default MenuItem;