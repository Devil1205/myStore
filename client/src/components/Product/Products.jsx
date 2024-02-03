import React, { useEffect, useState } from 'react';
import Loader from '../layout/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction.jsx';
import { useAlert } from 'react-alert';
import ProductCard from '../Home/ProductCard.jsx';
import { useSearchParams } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import './Products.css';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function Products() {

    const alert = useAlert();
    const dispatch = useDispatch();
    const [currentPage, setcurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(8);
    const { loading, products, error, productsCount } = useSelector(state => state.products);
    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        const searchQuery = searchParams.get("search") ?? "";
        dispatch(getProduct(searchQuery, currentPage, productsPerPage));
    }, [dispatch, error, alert, searchParams, currentPage, productsPerPage])


    return (
        <>
            {loading ? <Loader /> :
                <>
                    <h2 className="homeHeading">
                        Featured Products
                    </h2>
                    <div className="homeContainer">

                        {products && products[0] ? products.map((elem, ind) => {
                            return (<ProductCard key={ind} product={elem} />)
                        }) :
                            <div className="noReviews">No product found</div>
                        }

                    </div>

                    <div className="pagination my-4">
                        <ReactPaginate
                            previousLabel="Previous"
                            nextLabel="Next"
                            pageClassName="page-item"
                            pageLinkClassName="page-link"
                            previousClassName="page-item"
                            previousLinkClassName="page-link"
                            nextClassName="page-item"
                            nextLinkClassName="page-link"
                            breakLabel="..."
                            breakClassName="page-item"
                            breakLinkClassName="page-link"
                            pageCount={productsCount ? Math.ceil(productsCount / productsPerPage) : 1}
                            onPageChange={(e) => { setcurrentPage(e.selected + 1); console.log(e); console.log(currentPage) }}
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
                                onChange={(e)=>{setProductsPerPage(e.target.value)}}
                                sx={{height: "37.6px"}}
                            >
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