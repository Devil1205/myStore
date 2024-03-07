import { Rating } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {

    return (
        <Link className='productCard' to={"/product/" + product._id}>
            <img src={product.images[0].url} alt={product.name} />
            <h4>{product.name}</h4>
            <div className='d-flex align-items-center'>
                <Rating name="read-only" value={product.ratings} precision={0.5} readOnly sx={{ color: "tomato" }} size='medium'/> <span className='mx-2 text-primary'> ({product.numberOfReviews}) </span>
            </div>
            <div>Rs. {product.price}</div>
        </Link>
    )
}

export default ProductCard