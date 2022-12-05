import { Link} from 'react-router-dom'

import { Container} from 'react-bootstrap'
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { faBasketShopping, faEllipsisVertical} from "@fortawesome/free-solid-svg-icons";

import { constants, useStore, actions } from '../../stores';
import Navigation from './navigation'
import PopperMenu from '../../components/PopperMenu/popperMenu';
import SearchBar from '../../components/SearchBar/searchBar';

import styles from './Header.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';

function Header({ callback }) {
    const [state,dispatch] = useStore()
    const currentUser = localStorage.user ? JSON.parse(localStorage.user) : null
    const [countCart, setCountCart]= useState([])

    useEffect(() =>  {
        async function getData(){
            const book = (currentUser === '') 
                ? (
                    await axios
                    .get('http://localhost:5000/api/cart/', {
                        params: {
                            user: currentUser._id
                        }
                    })
                ).data : []
            setCountCart(book.products);
        }
        getData();  

    }, [])


    const handleMenuChange = (menuItem) => {
        switch (menuItem.type) {
            case 'theme':
                const newTheme = (localStorage.theme === 'dark') ? "light" : "dark";
                window.localStorage.setItem('theme', newTheme);
                callback(newTheme)
                break;
            case 'logout':
                localStorage.removeItem('user')
                dispatch(actions.setProductsCart([]))
                break;
            default:
        }
    }

    return (
        <div className={styles.wrapper}>
            <Container>
                <div className={styles.container}>
                    <div className={styles.leftSide}>
                        <Link to='/'>
                            <img src='/images/logo-vbook.png' className={styles.logo} alt="logo" />
                        </Link>
                        <div className='d-none d-lg-block'>
                            <Navigation />
                        </div>
                    </div>
                    <div className={styles.rightSide}>
                        <SearchBar />

                        {(currentUser) ? (
                            <Link to='/cart'>
                                <button className='btnCircle'>
                                    <Icon icon={faBasketShopping} />
                                    <div className='badge'>{state.productsCart.length}</div>
                                </button>
                            </Link>
                        ) : (
                            <Link to='/login' className={styles.btnLogin}>Sign In</Link>
                        )}
                        
                        <PopperMenu
                            width='200px'
                            items={(currentUser) ? constants.SINGED_ADVANCE_MENU : constants.DEFAULT_ADVANCE_MENU}
                            onChange={handleMenuChange}
                        >
                            {(currentUser) ? (
                                <button><img src={currentUser.avt} className={styles.avt} alt=''/></button>
                            ) : (
                                <button className='btnCircle'><Icon icon={faEllipsisVertical}/></button> 
                            )}
                        </PopperMenu>
                        
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Header;