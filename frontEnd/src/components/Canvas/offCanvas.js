import { useState } from 'react';
import styles from './Canvas.module.css'
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function OffCanvas({children, content , w = ' '}) {
    const [show, setShow] = useState(false);

    const toggleShow = () => {
        setShow(!show);
    }

    return ( 
        <div>
            <div onClick={toggleShow}>
                {children}
            </div>
            <div className={styles.container} >
                <div className={styles.mainSide} data-show={show}>
                    <button className='btnCircle' onClick={toggleShow}>
                        <Icon icon={faXmark} />
                    </button>
                    <div className={styles.content} style={{ width: w }}>
                        {content}
                    </div>
                </div>
                <div className={styles.overlay} data-show={show} onClick={toggleShow}></div>
            </div>
        </div>
    );
}

export default OffCanvas;

