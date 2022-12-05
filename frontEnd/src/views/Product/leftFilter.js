import styles from './Product.module.css'
import FilterByCategory from './Filter/filterByCategory';
import FilterByPrice from './Filter/filterByPrice';
import FilterByStar from './Filter/filterByStar';
import FilterByFormality from './Filter/filterByService';

function LeftFilter({filters, onChange}) {

    const handleCategoryChange = (newValue, isParent) => {  
        var newFilter = {};
        if(newValue != null) {
            if(isParent) {
                delete filters.type
                newFilter = { menu : newValue }
            } else {
                newFilter = { type : newValue }
            } 
        } else {
            delete filters.menu
            delete filters.type;
        }
        onChange(newFilter)
    }

    const handlePriceChange = (min, max) => {
        const newFilter = { minPrice: min, maxPrice: max }
        onChange(newFilter)
    }

    const handleStarChange = (star) => {
        const newFilter = { minStar: star }
        onChange(newFilter)
    }

    const handleServiceChange = (newFilter) => {
        if(filters[newFilter] != null) {
            delete filters[newFilter];
        } else {
            filters[newFilter] = true;
        }
        onChange(filters)
    }

    return ( 
        <>
            <div className={styles.filterContainer}>
                <div className={styles.filterContent}>
                    <FilterByCategory filters={filters} onChange={handleCategoryChange} />
                    <FilterByPrice onChange={handlePriceChange} />
                    <FilterByStar onChange={handleStarChange}/>
                    <FilterByFormality filters={filters} onChange={handleServiceChange}/>
                </div>
            </div>
        
        </>
    );
}

export default LeftFilter;
