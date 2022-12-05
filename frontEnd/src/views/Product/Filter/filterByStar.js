import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faStar} from '@fortawesome/free-solid-svg-icons';
import styles from './Filter.module.css'

function FilterByStar({onChange}) {
    const options = [5, 4, 3, 2, 1]

    const renderStar = (option) => {
        var star = [1, 2, 3, 4, 5];
        return star.map((item) => (
            <Icon 
                key={item} 
                icon={faStar} 
                style={ (item <= option) ? {color: "#FFBC1C"} : {color: "#B8B8B8"}}
            />       
        ))
    }

    return ( 
        <>
            <div className={styles.lable}>Đánh giá</div>
            <div className={styles.content}>
                {options.map(option => (
                    <div 
                        key={option} 
                        className={styles.starOption}
                        onClick={() => onChange(option)}
                    >
                        {renderStar(option)}
                        <span>Từ {option} sao</span>
                    </div>
                ))}
            </div>
        </>
    );
}

export default FilterByStar