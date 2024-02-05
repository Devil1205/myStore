import React, { useEffect, useState } from 'react';
import Loader from '../layout/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction.jsx';
import { useAlert } from 'react-alert';
import ProductCard from '../Home/ProductCard.jsx';
import { useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './Products.css';
import { Select, MenuItem, Slider, FormLabel, FormControl, FormControlLabel, Radio, RadioGroup, Button } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function Products() {

    const alert = useAlert();
    const dispatch = useDispatch();
    const [currentPage, setcurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(2);
    const [price, setPrice] = useState([0, 100000]);
    const [tempPrice, setTempPrice] = useState(price);
    const [category, setCategory] = useState('');
    const [tempCategory, setTempCategory] = useState(category);
    const { loading, products, error, productsCount } = useSelector(state => state.products);
    let [searchParams, setSearchParams] = useSearchParams();

    const hideFiltersMenu = ()=>{
        const filterMenu = document.querySelector('.filters');
        filterMenu.style.height = "0";
        filterMenu.style.padding = "0";
    }
    
    const showFiltersMenu = ()=>{
        const filterMenu = document.querySelector('.filters');
        filterMenu.style.height = "300px";
        filterMenu.style.padding = "20px";
    }

    const handleFilters = () => {
        setPrice(tempPrice);
        setCategory(tempCategory);
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        const searchQuery = searchParams.get("search") ?? "";
        dispatch(getProduct(searchQuery, currentPage, productsPerPage, price, category));
    }, [dispatch, error, alert, searchParams, currentPage, productsPerPage, price, category])


    return (
        <>
            {loading ? <Loader /> :
                <>
                    <div className="d-flex align-items-center">
                        <h2 className="homeHeading">
                            Featured Products
                        </h2>
                        <div className='filtersContainer'>
                            <FilterAltIcon id="filterIcon" onClick={showFiltersMenu}/>
                            <div className='filters'>
                                <div className="price">
                                    <span className='mb-3'>Price</span>
                                    <Slider
                                        value={tempPrice}
                                        sx={{color: "tomato", width: "96%"}}
                                        step={500}
                                        valueLabelDisplay="on"
                                        marks={false}
                                        onChange={(e, newPrice) => { setTempPrice(newPrice) }}
                                        min={0}
                                        max={100000}
                                        size='small'
                                        disableSwap
                                    />
                                </div>
                                <div className='categories'>
                                    <div>Categories</div>
                                    <div>
                                        <FormControl>
                                            <RadioGroup
                                                aria-labelledby="demo-controlled-radio-buttons-group"
                                                name="controlled-radio-buttons-group"
                                                value={tempCategory}
                                                onChange={(e, newCategory) => { setTempCategory(newCategory) }}
                                            >
                                                <FormControlLabel value="Laptop" control={<Radio size='small' sx={{ padding: "3px 5px" }} />} label="Laptops" />
                                                <FormControlLabel value="Phone" control={<Radio size='small' sx={{ padding: "3px 5px" }} />} label="Phones" />
                                                <FormControlLabel value="Cloth" control={<Radio size='small' sx={{ padding: "3px 5px" }} />} label="Clothes" />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className='filterButtons'>
                                    <Button variant="contained" className="filterButton" onClick={handleFilters}>Apply</Button>
                                    <Button variant="contained" className="filterButton" onClick={hideFiltersMenu}>Cancel</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="homeContainer">

                        {products && products[0] ? products.map((elem, ind) => {
                            return (<ProductCard key={ind} product={elem} />)
                        }) :
                            <div className="noReviews">No product found</div>
                        }

                    </div>

                    <div className="productPagination my-4">
                        <ReactPaginate
                            previousLabel="Prev"
                            nextLabel="Next"
                            pageClassName="pageItem"
                            pageLinkClassName="pageLink"
                            previousClassName="prevItem"
                            previousLinkClassName="prevLink"
                            nextClassName="nextItem"
                            nextLinkClassName="nextLink"
                            breakLabel="..."
                            breakClassName="breakItem"
                            breakLinkClassName="breakLink"
                            pageCount={productsCount ? Math.ceil(productsCount / productsPerPage) : 1}
                            onPageChange={(e) => { setcurrentPage(e.selected + 1) }}
                            containerClassName="pagination"
                            activeClassName="active"
                            forcePage={currentPage - 1}
                        />
                        <div className="productsPerPage">
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={productsPerPage}
                                label="Age"
                                onChange={(e) => { setProductsPerPage(e.target.value) }}
                                sx={{ height: "37.6px" }}
                            >
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={12}>12</MenuItem>
                                <MenuItem value={16}>16</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                            </Select>
                            <span>Per Page</span>
                        </div>
                    </div>

                </>}
        </>
    )
}

export default Products