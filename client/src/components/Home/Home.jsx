import React, { useEffect } from 'react';
import './Home.css';
import { CiDesktopMouse2 } from "react-icons/ci";
import { HashLink } from 'react-router-hash-link';
import MetaData from '../layout/MetaData.jsx';
import { clearErrors, getProduct } from '../../actions/productAction.jsx';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader.jsx';
import { useAlert } from 'react-alert';
import ProductCard from './ProductCard.jsx';
import Typewriter from 'typewriter-effect';

function Home() {
    const alert = useAlert();
    const dispatch = useDispatch();
    const bannerMessages = ["Wide range of Products", "Fast and Free Delivery", "Best Price Offers", "Secure Payment Environment"]
    const { loading, error, products } = useSelector(state => state.products);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch, error, alert])

    return (
        loading ? <Loader /> :

            <>
                <MetaData title="myStore" />
                <div className='banner'>
                    <h1>Welcome to myStore</h1>
                    <p>enjoy the premium quality products</p>
                    <HashLink to="#home-scroll" className='my-2'><button className="homeScrollButton">Scroll {<CiDesktopMouse2 />}</button></HashLink>
                    <div className='my-4'>
                        <div className='text-center my-3'>We Provide</div>
                        <Typewriter
                            options={{
                                strings: bannerMessages,
                                autoStart: true,
                                delay: 45,
                                deleteSpeed: 20,
                                loop: true,
                                pauseFor: 2000
                            }}

                        />
                    </div>
                </div>

                <h2 className="homeHeading" id="home-scroll">
                    Featured Products
                </h2>
                <div className="homeContainer">

                    {products && products.map((elem, ind) => {
                        return (<ProductCard key={ind} product={elem} />)
                    })}

                </div>
            </>
    )
}

export default Home