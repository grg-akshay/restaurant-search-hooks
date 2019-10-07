import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/Header.scss';

const Header = (props) => {
    return (
        <header>
            <div>
                <i className='fa fa-cutlery fa-3x black' aria-hidden='true' />
            </div>
            <div className='header-name'>
                <Link className='header-name__link' to='/'>
                    Tomatoes
                    <br/> <small>&nbsp;Restaurant Finder</small>
                </Link>
            </div>
        </header>
    )
};

export default Header;