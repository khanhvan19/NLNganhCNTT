import { useEffect, useState } from 'react';
import styles from './Filter.module.css'
import axios from 'axios';

function FilterByCategory({filters, onChange}) {
    const [levels, setLevels] = useState([])
    const currentLevel = levels[levels.length - 1]
    const [parent, setParent] = useState('')
    
    useEffect(() => {
        axios
        .get("http://localhost:5000/api/menu")
        .then((res) => {
            // setCategorys(res.data.data)
            setLevels([res.data.data])
        })
        .catch((err) => {
            console.log(err)
        });
    }, []);
    
    const handleClick = (category) => {
        var isParent = false;
        if(category.sub != null && category.sub.length !== 0) {
            setLevels(prev => [...prev, category.sub]);
            setParent(category.name)
            isParent = true
        }
        onChange(category.name, isParent)
    }

    const handleBack = (parent) => {
        setLevels(prev => prev.slice(0, prev.length - 1))
        onChange(parent, true)
    }

    const handleReset = () => {
        setLevels(prev => prev.slice(0, 1))
        onChange(null, true)
    }

    return ( 
        <>
            <div className={styles.lable}>Danh mục sản phẩm</div>
            <div className={styles.content}>
                <div 
                    className={styles.category}
                    data-active={filters.menu == null ? true : false}
                    onClick={() => {handleReset()}}
                >Tất cả sản phẩm</div>
                { levels.length > 1 && 
                    <div
                        className={styles.parentCategory}
                        onClick={() => handleBack(parent)}
                    >
                        {parent}
                    </div>
                }
                { currentLevel != null && currentLevel.map(category => (
                    (category.show === true) && (
                        <div 
                            key={category._id}
                            className={styles.category}
                            data-active={
                                (category.name === filters.menu || category.name === filters.type) ? true : false
                            }
                            onClick={() => handleClick(category)}
                        >
                            {category.name}
                        </div>
                    )
                ))} 
            </div>
        </>
    );
}

export default FilterByCategory;