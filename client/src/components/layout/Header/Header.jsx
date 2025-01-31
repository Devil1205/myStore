import React, { useEffect } from 'react';
import { ReactNavbar } from "overlay-navbar";
import navbarLogo from '../../../Images/navbarLogo2.png';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Header.css';
import { useSelector } from 'react-redux';

function Header() {

    const { isAuthenticated, user } = useSelector((state) => state.user);

    useEffect(() => {
        const avatar = document.getElementById("profileIcon");
        avatar.src = isAuthenticated?user.avatar.url:"/profile.png";
    }, [isAuthenticated])
    

    return (
        <ReactNavbar 
            burgerColor="#ffa6a6"
            logo={navbarLogo}
            logoHoverSize="10px"
            logoHoverColor="#440000"
            navColor1="rgb(27 0 0 / 89%)"
            link1Text="Home"
            link1Url="/home"
            link2Text="Products"
            link2Url="/products"
            link3Text="About"
            link3Url="/about"
            link4Text="Contact"
            link4Url="/contact"
            link1Size="30px"
            link1Family="roboto"
            link1Color="white"
            link1ColorHover="tomato"
            link1Margin="10px"
            link1Paddin="5px"
            searchIcon
            searchIconUrl="/search"
            searchIconColor="#0d6efd"
            searchIconColorHover="rgb(4 69 164)"
            searchIconSize="large"
            searchIconMargin="10px"
            SearchIconElement={SearchIcon}
            cartIcon
            cartIconUrl="/cart"
            cartIconColor="#0d6efd"
            cartIconColorHover="rgb(4 69 164)"
            cartIconSize="large"
            cartIconMargin="10px"
            CartIconElement={ShoppingCartIcon}
            profileIcon
            profileIconUrl="/login"
            profileIconColor="#0d6efd"
            profileIconColorHover="rgb(4 69 164)"
            profileIconSize="large"
            profileIconMargin="10px"
            ProfileIconElement="img"
        />
    )
}

export default Header