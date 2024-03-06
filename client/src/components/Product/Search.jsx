import React from 'react';
import './Search.css';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';

function Search() {

    const navigate = useNavigate();
    const handleProductSearch = (e) => {
        e.preventDefault();
        const data = document.getElementById('searchProducts');
        navigate(`/products?search=${data.value}`);
    }

    return (
        <div className='searchProducts'>
            <MetaData title="myStore - Search Product" />
            <form onSubmit={handleProductSearch}>
                <TextField id='searchProducts' label="Search Products" variant="outlined" fullWidth
                    InputProps={{
                        endAdornment:
                            <IconButton color="primary" aria-label="add to shopping cart" type='submit'>
                                <SearchIcon sx={{ fontSize: "30px" }} />
                            </IconButton>
                    }} />
            </form>
        </div>
    )
}

export default Search