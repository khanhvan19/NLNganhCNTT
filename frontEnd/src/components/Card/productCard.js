import {Col} from 'react-bootstrap'
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faStar as faStarFill} from '@fortawesome/free-solid-svg-icons';
import { faStar, faStarHalfStroke} from '@fortawesome/free-regular-svg-icons';

import styles from './Card.module.css'
import { Link } from 'react-router-dom';

function ProductCard({ data }) {
    const formatMoney = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND' 
    })

    const renderStar = (star) => {
        const starArray = [...Array(5).keys()].map(idx => idx + 1);
        return (starArray.map(idx => (
            <Icon
                key={idx} 
                icon={
                    (idx <= star) 
                    ? faStarFill 
                    : (idx - star < 1) 
                        ? faStarHalfStroke
                        : faStar   
                }
            />
        )))
    }

    return ( 
        <Link to={`/detail/${data._id}`}>
            <div className={styles.cardProd}>
                <img className={styles.cardImg} src={data.images[0]} alt={data.name}/>
                <div className={styles.cardBody}>
                    <div className={styles.prodName}>{data.name}</div>
                    <div className={styles.prodAuthor}>__ {data.author}</div>
                    <div className={styles.prodPrice}>
                        <div>{formatMoney.format(data.price - (data.price * (data.discount/100)))}</div>
                        <span>{formatMoney.format(data.price)}</span>
                        {(data.discount > 0) 
                            ? ( <span className={styles.discount}>-{data.discount}%</span>)
                            : null
                        }  
                    </div>
                    <div className={styles.prodCardBottom}>
                        <div className={styles.prodStar}>
                            {renderStar(data.star)}
                            <span className='ms-1'>{data.star}</span>
                        </div>
                        <span className={styles.prodSold}>Đã bán: {data.sold}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;

