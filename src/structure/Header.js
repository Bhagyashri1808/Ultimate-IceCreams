import React from 'react';
import iceCreamImg from '../assets/img/ultimate-ice-cream.svg';
import {NavLink} from 'react-router-dom'

const Header = () => (
    // eslint-disable-next-line no-unused-expressions
    <header>
        <h1>
            <img src={iceCreamImg} alt="" />
            Ultimate Ice Cream
        </h1>
        <nav>
            <NavLink to='/' activeClassName='selected' exact>
            Menu
            </NavLink>
            <NavLink to='/ice-creams' activeClassName='active'>
            Add IceCream
            </NavLink>
        </nav>
    </header>
);

export default Header;