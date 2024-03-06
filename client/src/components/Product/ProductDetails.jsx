import React, { useEffect, useState } from 'react';
import './ProductDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader.jsx';
import { useAlert } from 'react-alert';
import { clearErrors, getProductDetails } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ReactStars from 'react-rating-stars-component';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';
import Review from './ReviewCard.jsx';
import MetaData from '../layout/MetaData.jsx';
import { addItemsToCart } from '../../actions/cartAction.jsx';


function ProductDetails() {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, product } = useSelector(state => state.productDetails);
    const { id } = useParams();
    const options = {
        edit: false,
        color: "rgb(20,20,20,0.1)",
        activeColor: "tomato",
        value: product && product.ratings,
        isHalf: true,
        size: 25
    }
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => {
        if (quantity >= product.stock)
            return;
        setQuantity(quantity + 1);
    }

    const decreaseQuantity = () => {
        if (quantity <= 1)
            return;
        setQuantity(quantity - 1);
    }

    const addToCartHandle = () => {
        dispatch(addItemsToCart(product, quantity));
        alert.success("Item added to cart")
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(id));
    }, [dispatch, error, alert]);

    return (
        loading ? <Loader /> : <>
            <MetaData title={`myStore - ${product.name}`} />
            <div className='productContainer'>

                <div>
                    <Carousel
                        showArrows={false}
                        showStatus={false}
                        dynamicHeight
                    >
                        {product.images && product.images.map((elem, ind) => {
                            return (
                                <img key={ind} className='productImage' src={elem.url} alt={elem.name} />
                            )
                        })}
                    </Carousel>
                </div>

                <div>
                    <div className="productBlock-1">
                        <h2 className='my-1'>{product.name}</h2>
                        <div className='text-secondary'>Product #{product._id}</div>
                    </div>

                    <div className="productBlock-2">
                        <ReactStars {...options} /> <span className='text-primary'> ({product.numberOfReviews} Reviews) </span>
                    </div>

                    <div className="productBlock-3">
                        <h4>Rs. {product.price}</h4>
                        <div className="productBlock-3-1">
                            <div className="productBlock-3-1-1">
                                <IconButton color="error" aria-label="decrease qty" onClick={decreaseQuantity}>
                                    <RemoveIcon />
                                </IconButton>
                                <span>{quantity}</span>
                                <IconButton color="success" aria-label="increase qty" onClick={increaseQuantity}>
                                    <AddIcon />
                                </IconButton>
                            </div>
                            <Button variant="outlined" color="primary" onClick={addToCartHandle}>Add to Cart</Button>
                        </div>
                        <p>
                            <b className={`text-${product.stock < 1 ? "danger" : "success"}`}>
                                {product.stock < 1 ? "Out of Stock" : "In Stock"}
                            </b>
                        </p>
                    </div>

                    <div className="productBlock-4">
                        Description : <p>{product.description}</p>
                    </div>

                </div>
            </div>

            <div className="productReviews">

                <h3>Reviews</h3>

                <div>
                    {product.reviews && product.reviews[0] ?
                        product.reviews.map((elem, ind) => {
                            return (
                                <Review key={ind} review={elem} />
                            )
                        }) :
                        <div className="noReviews">No Reviews Yet</div>
                    }
                </div>
            </div>
        </>
    )
}

export default ProductDetails