import React, { useEffect } from 'react';
import './Home.css';
import { CiDesktopMouse2 } from "react-icons/ci";
import Product from './Product.jsx';
import { HashLink } from 'react-router-hash-link';
import MetaData from '../layout/MetaData.jsx';
import { getProduct } from '../../actions/productAction.jsx';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader.jsx';
import { useAlert } from 'react-alert';

function Home() {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products, productsCount } = useSelector(state => state.products);

    useEffect(() => {
        if(error)
            return alert.error(error);
        dispatch(getProduct(dispatch));
    }, [dispatch, error])

    return (
        loading ? <Loader /> :

            <>
                <MetaData title="myStore" />
                <div className='banner'>
                    <h1>Welcome to myStore</h1>
                    <p>enjoy the premium quality products</p>
                    <HashLink to="#home-scroll" className='my-2'><button className="homeScrollButton">Scroll {<CiDesktopMouse2 />}</button></HashLink>
                </div>

                <h2 className="homeHeading" id="home-scroll">
                    Featured Products
                </h2>
                <div className="homeContainer">

                    {products && products.map((elem, ind) => {
                        return (<Product key={ind} product={elem} />)
                    })}

                </div>
            </>
    )
}

export default Home