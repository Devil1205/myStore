import React from 'react';
import './Search.css';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

function Search() {

    const handleProductSearch = (e) => {
        e.preventDefault();
        const data = document.getElementById('searchProducts');
        console.log(data.value);
    }

    return (
        <div className='searchProducts'>
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