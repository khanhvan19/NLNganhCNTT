import { useState, useLayoutEffect } from 'react';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Tippy from '@tippyjs/react/headless';

import MenuItem from '../Card/menuItem';
import styles from './PopperMenu.module.css'


function PopperMenu({ children, items = [], width = ' ', onChange = () => { } }) {
    const [history, setHistory] = useState([{ data: items }])
    const current = history[history.length - 1] //cuối của mảng history lưu lịch sử mở cấp
    const [header, setHeader] = useState('');

    useLayoutEffect(() => {
        setHistory([{ data: items }])
    }, [items])
    // console.log(history, current)
    return (
        <div>
            <Tippy
                interactive
                trigger='click'
                placement="bottom-end"
                onHide={() => setHistory(prev => prev.slice(0, 1))}
                render={(attrs) => (
                    <div className={styles.popper} tabIndex="-1" {...attrs} style={{ width: width }} >
                        {history.length > 1 && (
                            <div className={styles.menuHeader}>
                                <button
                                    className={styles.iconBack}
                                    onClick={() => { setHistory(prev => prev.slice(0, prev.length - 1)) }}
                                >
                                    <Icon icon={faChevronLeft} />
                                </button>
                                {header}
                            </div>
                        )}
                        {current.data.map((item, index) => (
                            <MenuItem
                                key={index}
                                data={item}
                                onClick={() => {
                                    if (item.children) {
                                        setHeader(item.name)
                                        setHistory(prev => [...prev, item.children]);
                                    } else {
                                        onChange(item)
                                    };
                                }}
                            />
                        ))}
                    </div>
                )}
            >
                {children}
            </Tippy>
        </div>
    );
}

export default PopperMenu;