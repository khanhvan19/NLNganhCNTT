import { useEffect, useState, useRef } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import Tippy from '@tippyjs/react/headless';

import { useStore, actions, useDebounce } from '../../stores'
import SmallCard from '../Card/smallCard';
import styles from './SearchBar.module.css'


function Search() {
    const [state, dispatch] = useStore()
    const [showResult, setShowResult] = useState(true);
    const navigate = useNavigate();
    
    const searchValue = useDebounce(state.searchValue, 500)
    const inputRef = useRef()
    
    useEffect(() => {
        if(!searchValue.trim()) {
            dispatch(actions.setSearchResult([]))
            return;
        }
        axios
        .get("http://localhost:5000/api/book/search", {
            params: {
                q: searchValue
            }
        })
        .then((res) => {
            dispatch(actions.setSearchResult(res.data.data))
        })
        .catch((err) => {
            console.log(err)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchValue])
    
    const handleChance = (e) => {
        const searchValue = e.target.value
        if (!searchValue.startsWith(' ')) {
            dispatch(actions.setSearchValue(searchValue))     
        }
    }

    const clearValue = () => {
        dispatch(actions.setSearchValue(''))
        dispatch(actions.setSearchResult([]))
        inputRef.current.focus()
    }

    const handleSubmit = (e) => {
        if(state.searchValue) {
            navigate('/search')
            setShowResult(false)
        } else {
            inputRef.current.focus();
        }
    }

    return (
        <div className={styles.container}>
            <Tippy
                interactive
                placement='bottom'
                visible={showResult && state.searchResult.length > 0}
                render={(attrs) => (
                    <div className={styles.result} tabIndex="-1" {...attrs}>    
                        {state.searchResult.map(result => (
                            <Link to={`/detail/${result._id}`}>
                                <SmallCard key={result._id} data={result}/>
                            </Link>
                        ))}
                    </div>
                )}
                onClickOutside={() => setShowResult(false)}
            >
                <div className={styles.searchBar}>
                    <input 
                        className={styles.input}
                        ref={inputRef}
                        value={state.searchValue}
                        spellCheck={false} 
                        placeholder='Bạn muốn tìm sách gì?'
                        onChange={handleChance}
                        onFocus={() => setShowResult(true)}
                    />
                    {!!state.searchValue && 
                        <button className={styles.clearIcon} onClick={clearValue}>
                            <Icon icon={faCircleXmark} />
                        </button>
                    }
                    <button className={styles.submitIcon} onClick={handleSubmit}>
                        <Icon icon={faMagnifyingGlass} />
                    </button>
                </div>
            </Tippy>
        </div>
    );
}

export default Search
