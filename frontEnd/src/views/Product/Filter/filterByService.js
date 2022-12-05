import styles from './Filter.module.css'

function FilterByFormality({filters, onChange}) {
    const options = [
        { value: "isPromotion", lable: "Có khuyến mãi" },
        { value: "freeShip", lable: "Miễn phí vận chuyển" },
    ]

    return ( 
        <>
            <div className={styles.lable}>Dịch vụ</div>
            <div className={styles.content}>
                { options.map(option => (
                    <div key={option.value} className={styles.serviceOption}>
                        <input 
                            checked={!!filters[option.value]}
                            type='checkbox' 
                            id={option.value}
                            name={option.value}
                            onChange={(e) => onChange(e.target.name)}
                        />
                        <label htmlFor={option.value}>{option.lable}</label>
                    </div>
                ))}
            </div>
        </>
    );
}

export default FilterByFormality;