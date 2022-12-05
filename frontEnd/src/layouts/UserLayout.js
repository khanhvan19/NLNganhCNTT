import { useEffect, useState } from 'react';

import {faSun, faMoon} from "@fortawesome/free-regular-svg-icons";

import { constants } from '../stores';
import { Header, Footer } from '../views'

function UserLayout({ children }) {
    const [theme, setTheme] = useState('');
    const [isChange, setIsChange] = useState('')

    const getChangeTheme = (theme) => {
        setIsChange(theme)
    } 

    useEffect(() => {
        const currentTheme = (localStorage.theme) ? localStorage.getItem('theme') : 'light';
        setTheme(currentTheme);
        if(currentTheme === 'dark'){
            constants.DEFAULT_ADVANCE_MENU[0].icon = faSun
            constants.DEFAULT_ADVANCE_MENU[0].name = 'Giao diện: Sáng'
        } else {
            constants.DEFAULT_ADVANCE_MENU[0].icon = faMoon
            constants.DEFAULT_ADVANCE_MENU[0].name = 'Giao diện: Tối'
        }
        
    }, [isChange])

    return ( 
        <div data-theme={theme}> 
            <Header callback={getChangeTheme}/>
            <div className='wrapper-content'>
                {children}
            </div>
            <Footer />
        </div>
    );
}

export default UserLayout;