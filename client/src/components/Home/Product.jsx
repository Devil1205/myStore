import React from 'react';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

function Product({ product }) {

    const options = {
        edit: false,
        color: "rgb(20,20,20,0.1)",
        activeColor: "tomato",
        value: product.ratings,
        isHalf: true,
        size: 25
    }

    return (
        <Link className='productCard' to={"/product/"+product._id}>
            <img src={product.images[0].url} alt={product.name} />
            <h4>{product.name}</h4>
            <div className='d-flex align-items-center'>
                <ReactStars {...options} /> <span className='mx-2 text-primary'> ({product.numberOfReviews}) </span>
            </div>
            <div>Rs. {product.price}</div>
        </Link>
    )
}

export default Product