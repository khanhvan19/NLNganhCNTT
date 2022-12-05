import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faXmark} from '@fortawesome/free-solid-svg-icons';
import styles from './Product.module.css'
import { useMemo } from 'react';

function ListFilterChip({filters, onChange}) {
    const formatMoney = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND' 
    })

    const FILTERS_CHIP = [
        {
            lable: 'Miễn phí vận chuyển',
            canRemove: false,
            isShow: () => true,
            handleClick: (obj) => {
                const newObj = {...obj};
                (newObj.freeShip) 
                    ? delete newObj.freeShip
                    : newObj.freeShip = true;
                return newObj;
            }
        },
        {
            lable: `${formatMoney.format(filters.minPrice)} đến ${formatMoney.format(filters.maxPrice)}`,
            canRemove: true,
            isShow: (obj) => !!(obj.minPrice && obj.maxPrice),
            handleClick: (obj) => {
                const newObj = {...obj}
                delete newObj.maxPrice
                delete newObj.minPrice
                return newObj;
            }
        },
        {
            lable: `Từ ${filters.minStar} sao`,
            canRemove: true,
            isShow: (obj) => !!(obj.minStar),
            handleClick: (obj) => {
                const newObj = {...obj}
                delete newObj.minStar
                return newObj;
            }
        },
        {
            lable: 'Có khuyến mãi',
            canRemove: true,
            isShow: (obj) => !!(obj.isPromotion === 'true'),
            handleClick: (obj) => {
                const newObj = { ...obj };
                delete newObj.isPromotion
                return newObj;
            }
        }
    ]

    const filterChipIsShow = useMemo(() => {
        return FILTERS_CHIP.filter((item) => item.isShow(filters))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters])

    return ( 
        <div className={styles.filterChipContainer}>
            { filterChipIsShow.map((item, index) => (
                <div 
                    key={index}
                    data-active={filters.freeShip != null ? filters.freeShip : false}
                    className={styles.filterChip}
                    onClick={
                    (!item.canRemove)
                        ? () => {onChange(item.handleClick(filters))} 
                        : null
                    }
                >
                    <span>{ item.lable }</span>
                    { (item.canRemove) 
                        ? <button onClick={ () => {onChange(item.handleClick(filters))} }>
                            <Icon icon={faXmark}/>
                        </button> 
                        : null   
                    }
                </div>
            ))}
        </div>
    );
}

export default ListFilterChip;