import {Row, Col} from 'react-bootstrap'

import styles from './Card.module.css'

function SmallCard({ data }) {
    return ( 
        <Row className={styles.smallCard}>
            <Col xs='3' className='text-center'>
                <img src={data.images[0]} className={styles.imgSmallCard} alt={data.name} />
            </Col>
            <Col>
                <div className={styles.titleSmallCard}>{data.name}</div>
                <div className={styles.textSmallCard}>{data.author}</div>
            </Col>
        </Row>
    );
}

export default SmallCard;