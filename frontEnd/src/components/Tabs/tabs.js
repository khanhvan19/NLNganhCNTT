import styles from './Tabs.module.css'

function Tabs({items, current, onTabsChange}) {
    return ( 
        <div className={styles.container}>
            {items.map((item, idx) => (
                <button 
                    key={idx}
                    className={styles.item}
                    data-active={item.value === current ? 'true' : 'false'}
                    onClick={() => onTabsChange(item.value)}
                >
                    {item.title}
                </button>
            ))}
        </div>
    );
}

export default Tabs
;