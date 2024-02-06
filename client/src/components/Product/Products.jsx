import React, { useEffect, useState } from 'react';
import Loader from '../layout/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction.jsx';
import { useAlert } from 'react-alert';
import ProductCard from '../Home/ProductCard.jsx';
import { useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './Products.css';
import { Select, MenuItem, Slider, FormControl, FormControlLabel, Radio, RadioGroup, Button } from '@mui/material';
import StarRateIcon from '@mui/icons-material/StarRate';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from '@mui/icons-material/Close';
import MetaData from '../layout/MetaData.jsx';

function Products() {

    const alert = useAlert();
    const dispatch = useDispatch();
    const [currentPage, setcurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(2);
    const [price, setPrice] = useState([0, 100000]);
    const [tempPrice, setTempPrice] = useState(price);
    const [category, setCategory] = useState('');
    const [tempCategory, setTempCategory] = useState(category);
    const [rating, setRating] = useState(0);
    const [tempRating, setTempRating] = useState(rating);
    const { loading, products, error, totalProductCount, filteredProductCount } = useSelector(state => state.products);
    let [searchParams, setSearchParams] = useSearchParams();

    const hideFiltersMenu = () => {
        setTempCategory(category);
        setTempPrice(price);
        setTempRating(rating);
        const filterMenu = document.querySelector('.filters');
        filterMenu.style.height = "0";
        filterMenu.style.padding = "0";
    }

    const showFiltersMenu = () => {
        const filterMenu = document.querySelector('.filters');
        filterMenu.style.height = "444px";
        filterMenu.style.padding = "20px";
    }

    const handleFilters = () => {
        setPrice(tempPrice);
        setCategory(tempCategory);
        setRating(tempRating);
        setcurrentPage(1);
        const filterMenu = document.querySelector('.filters');
        filterMenu.style.height = "0";
        filterMenu.style.padding = "0";
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        const searchQuery = searchParams.get("search") ?? "";
        dispatch(getProduct(searchQuery, currentPage, productsPerPage, price, category, rating));
    }, [dispatch, error, alert, searchParams, currentPage, productsPerPage, price, category, rating])


    return (
        <>
            {loading ? <Loader /> :
                <div className='h-100vh'>
                    <MetaData title={"Products - myStore"} />
                    <div>
                        <div className="d-flex align-items-center">
                            <h2 className="homeHeading mb-2">
                                Featured Products
                            </h2>
                            <div className='filtersContainer'>
                                <FilterAltIcon id="filterIcon" onClick={showFiltersMenu} />
                                <div className='filters'>
                                    <div className="price">
                                        <span className='mb-3'>Price</span>
                                        <Slider
                                            value={tempPrice}
                                            sx={{ color: "tomato", width: "96%" }}
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
                                    <div className='rating'>
                                        <div>Customer Ratings</div>
                                        <div>
                                            <FormControl>
                                                <RadioGroup
                                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                                    name="controlled-radio-buttons-group"
                                                    value={tempRating}
                                                    onChange={(e, newRating) => { setTempRating(newRating) }}
                                                >
                                                    <FormControlLabel value="4" control={<Radio size='small' sx={{ padding: "3px 5px" }} />} label={<div style={{ font: "500 15px 'Roboto'" }}>4<StarRateIcon sx={{ fontSize: "15px", marginBottom: "3px" }} /> & above</div>} />
                                                    <FormControlLabel value="3" control={<Radio size='small' sx={{ padding: "3px 5px" }} />} label={<div style={{ font: "500 15px 'Roboto'" }}>3<StarRateIcon sx={{ fontSize: "15px", marginBottom: "3px" }} /> & above</div>} />
                                                    <FormControlLabel value="2" control={<Radio size='small' sx={{ padding: "3px 5px" }} />} label={<div style={{ font: "500 15px 'Roboto'" }}>2<StarRateIcon sx={{ fontSize: "15px", marginBottom: "3px" }} /> & above</div>} />
                                                    <FormControlLabel value="1" control={<Radio size='small' sx={{ padding: "3px 5px" }} />} label={<div style={{ font: "500 15px 'Roboto'" }}>1<StarRateIcon sx={{ fontSize: "15px", marginBottom: "3px" }} /> & above</div>} />
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

                        <div className="appliedFilters">
                            {category && <div>{category}
                                <span>
                                    <CloseIcon fontSize='small' onClick={() => { setCategory(""); setTempCategory(""); setcurrentPage(1); }} />
                                </span>
                            </div>}
                            {rating !== 0 && <div>
                                <div style={{ font: "500 15px 'Roboto'" }}>{rating}<StarRateIcon sx={{ fontSize: "15px", marginBottom: "3px" }} /> & above</div>
                                <span>
                                    <CloseIcon fontSize='small' onClick={() => { setRating(0); setTempRating(0); setcurrentPage(1) }} />
                                </span>
                            </div>}
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
                            pageCount={filteredProductCount > 0 ? Math.ceil(filteredProductCount / productsPerPage) : 1}
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
                                onChange={(e) => { setProductsPerPage(e.target.value); setcurrentPage(1) }}
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

                </div>}
        </>
    )
}

export default Products