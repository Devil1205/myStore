import React from 'react'
import navbarLogo from '../../Images/navbarLogo.png'
import './Navbar.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Navbar() {
    return (
        <div className='myNavbar'>
            <div className="upperNav">
                <div>You order, we deliver</div>
                <div>
                    <a href='#'>Sign In</a>
                </div>
            </div>
            <div className="navbarLogo">
                <img src={navbarLogo} alt="" />
                <div className='searchBar'>
                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '90%' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField id="outlined-basic" label="Search" variant="outlined" size="small" fullWidth />
                    </Box>
                    <SearchIcon className='me-2' style={{ cursor: "pointer" }} />
                </div>
                <div className="account">
                    <a href="#"><ShoppingCartIcon /></a>
                </div>
            </div>
        </div>
    )
}

export default Navbar