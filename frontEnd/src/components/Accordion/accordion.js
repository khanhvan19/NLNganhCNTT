import { useState } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

import MenuItem from "../Card/menuItem";
import styles from "./Accordion.module.css"

function Accordion({items = [], icon}) {
    const [clicked, setClicked] = useState(null)
   
    const toggleExpand = (index) => {
        if(clicked === index) {
            return setClicked(null)
        }
        setClicked(index)
    }

    return ( 
        <div>
            { items.map((item, index) => {
                return (
                    <div key={index} className={styles.item}>
                        <div className={styles.header}
                            aria-expanded={(clicked === index) ? 'true' : 'false'} 
                            >
                            <span className={styles.name}>
                                <MenuItem data={{...item}} />
                            </span>
                            {(item.children != null) && (
                                <button 
                                    className={styles.btnExpand}
                                    onClick={() => toggleExpand(index)}
                                >
                                    <Icon icon={icon}/>
                                </button>
                            )}
                        </div>
                        <div className={styles.body}>
                            { item.children != null && item.children.map((childItem, idx) => (
                                <MenuItem
                                    key={idx}
                                    data={{...childItem}} 
                                />     
                            ))}
                        </div>
                    </div>
                )
            })}
        </div>
    );
}

export default Accordion;