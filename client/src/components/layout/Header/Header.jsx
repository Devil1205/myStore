import React from 'react';
import { ReactNavbar } from "overlay-navbar";
import navbarLogo from '../../../Images/navbarLogo2.png';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './Header.css';


function Header() {
    return (
        <ReactNavbar 
            logo={navbarLogo}
            logoHoverSize="10px"
            logoHoverColor="#440000"
            navColor1="rgb(255, 245, 245)"
            link1Text="Home"
            link1Url="/home"
            link2Text="About"
            link2Url="/about"
            link3Text="Shopping"
            link3Url="/shopping"
            link4Text="Contact"
            link4Url="/contact"
            link1Size="30px"
            link1Family="roboto"
            link1Color="black"
            link1ColorHover="red"
            link1Margin="10px"
            link1Paddin="5px"
            searchIcon
            searchIconColor="#0d6efd"
            searchIconColorHover="rgb(4 69 164)"
            searchIconSize="large"
            searchIconMargin="10px"
            SearchIconElement={SearchIcon}
            cartIcon
            cartIconColor="#0d6efd"
            cartIconColorHover="rgb(4 69 164)"
            cartIconSize="large"
            cartIconMargin="10px"
            CartIconElement={ShoppingCartIcon}
            profileIcon
            profileIconColor="#0d6efd"
            profileIconColorHover="rgb(4 69 164)"
            profileIconSize="large"
            profileIconMargin="10px"
            ProfileIconElement={AccountCircleIcon}
        />
    )
}

export default Header