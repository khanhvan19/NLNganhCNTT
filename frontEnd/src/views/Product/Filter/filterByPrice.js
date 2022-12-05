import { useState } from 'react';
import styles from './Filter.module.css'

function FilterByPrice({onChange}) {
    const [max, setMax] = useState('')
    const [min, setMin] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        onChange(min, max);
        setMax('')
        setMin('')
    }

    return ( 
        <>
            <div className={styles.lable}>Khoảng giá</div>
            <form noValidate onSubmit={handleSubmit} className={styles.content}>
                <div className={styles.inputPrice}>
                    <label htmlFor='priceMin'>Từ:  </label>
                    <input 
                        type='number' 
                        id='priceMin'
                        name='priceMin'
                        placeholder='Giá thấp'
                        value={min}
                        onChange={(e) => {setMin(e.target.value)}}
                    />
                </div>
                <div className={styles.inputPrice}>
                    <label htmlFor='priceMax'>Đến: </label> 
                    <input 
                        type='number' 
                        id='priceMax'
                        name='priceMax'
                        placeholder='Giá cao'
                        value={max}
                        onChange={(e) => {setMax(e.target.value)}}
                    />
                </div>
                <div>
                    <button 
                        type='submit'  
                        disabled={(min !== '' && max !== '' && parseInt(min) <= parseInt(max)) ? false : true}
                        className={styles.btnSubmitPrice}
                    >
                        Áp dụng
                    </button>
                </div>
            </form>
        </>
    );
}

export default FilterByPrice;