import {useMemo, useState} from 'react'

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";

import styles from './Pagination.module.css'

function Pagination({ totalPages, current, onPageChange}) {
    const [paginationItem, setPaginationItem] = useState([])
    var sibling = 1;

    const range = (start, end) => { // sinh mảng từ start -> end
        let length = end - start + 1
        return Array.from({length}, (_, idx) => start + idx);
    }

    const leftSibling = Math.max(current - sibling, 1)
    const showLeftDots = leftSibling > 2

    const rightSibling = Math.min(current + sibling, totalPages)
    const showRightDots = rightSibling < totalPages - 2

    useMemo(() => {
        if (totalPages <= sibling + 5) {//page count <= 6. no dots
            setPaginationItem(range(1, totalPages));
        } 
        else if(!showLeftDots && showRightDots) { //case2: page count >= 7 (1 ... 3 4 5 6 7). left DOTS
            let leftItem = 3 + 2 * sibling
            let leftRange = range(1, leftItem)
            setPaginationItem([...leftRange, 'DOTS', totalPages]);
        } 
        else if(showLeftDots && !showRightDots) { //case3: page count >= 7 (1 2 3 4 5 ... 7). right DOTS
            let rightItem = 3 + 2 * sibling
            let rightRange =  range(totalPages - rightItem + 1, totalPages)
            setPaginationItem([1, 'DOTS', ...rightRange])
        } 
        else if(showLeftDots && showRightDots) { //case4: page count >= 8 (1 ... 3 <4> 5 ... 8). both
            let middleRange = range(leftSibling, rightSibling)
            setPaginationItem([1, 'DOTS', ...middleRange, 'DOTS', totalPages])
        }     

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [totalPages, current])

    return ( 
        <nav className={styles.container}>
            <button 
                onClick={() => onPageChange(current - 1)}
                disabled={(current === 1) ? true : false}
            >
                <Icon icon={faChevronLeft}/>
            </button>
            {paginationItem.map((item, idx) => {
                if(item === 'DOTS') {
                    return (
                        <span key={idx} className={styles.dots}>...</span>
                    )
                } else {
                    return (
                        <button 
                            key={idx}
                            className='btnCircle'
                            data-selected = {(item === current) ? true : false} 
                            onClick={() => onPageChange(item)}
                        >
                            {item}
                        </button>
                    )
                }
            })}
            <button 
                onClick={() => onPageChange(current + 1)}
                disabled={(current === totalPages) ? true : false} 
            >
                <Icon icon={faChevronRight}/>
            </button>
        </nav>
    );
}

export default Pagination;