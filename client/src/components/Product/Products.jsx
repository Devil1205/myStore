import React, { useEffect } from 'react';
import Loader from '../layout/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction.jsx';
import { useAlert } from 'react-alert';
import ProductCard from '../Home/ProductCard.jsx';

function Products() {

    const dispatch = useDispatch();
    const { loading, products, error, productsCount } = useSelector(state => state.products);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(dispatch));
    }, [dispatch, error, alert])


    return (
        <>
            {loading ? <Loader /> :
                <>
                    <h2 className="homeHeading" id="home-scroll">
                        Featured Products
                    </h2>
                    <div className="homeContainer">

                        {products && products.map((elem, ind) => {
                            return (<ProductCard key={ind} product={elem} />)
                        })}

                    </div>
                </>}
        </>
    )
}

export default Products