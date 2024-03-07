import React, { useEffect, useState } from 'react';
import './ProductDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader.jsx';
import { useAlert } from 'react-alert';
import { clearErrors, createReview, getProductDetails } from '../../actions/productAction';
import { useParams } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';
import Review from './ReviewCard.jsx';
import MetaData from '../layout/MetaData.jsx';
import { addItemsToCart } from '../../actions/cartAction.jsx';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import { CREATE_REVIEW_RESET } from '../../constants/productContants.jsx';

function ProductDetails() {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, product } = useSelector(state => state.productDetails);
    const { error: reviewError, success } = useSelector(state => state.newReview);
    const { user } = useSelector(state => state.user);
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

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

    const toggleDialog = () => {
        if (open)
            setOpen(false);
        else
            setOpen(true);
    }

    const submitReviewHandle = () => {
        const reviewData = {
            rating,
            comment
        };
        dispatch(createReview(reviewData, product._id))
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(id));

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Review added successfully");
            dispatch({ type: CREATE_REVIEW_RESET });
        }
    }, [dispatch, error, alert, reviewError, success]);

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
                        <Rating name="read-only" value={product.ratings} precision={0.5} readOnly sx={{ color: "tomato" }} /> <span className='text-primary mx-2' style={{ font: "400 17px 'Roboto'" }}> ({product.numberOfReviews} Reviews) </span>
                    </div>

                    <div className="productBlock-3">
                        <h4>Rs. {product.price}</h4>
                        <div className="productBlock-3-1">
                            <div className="productBlock-3-1-1">
                                <IconButton color="error" aria-label="decrease qty" disabled={quantity <= 1} onClick={decreaseQuantity}>
                                    <RemoveIcon />
                                </IconButton>
                                <span>{quantity}</span>
                                <IconButton color="success" aria-label="increase qty" disabled={quantity >= product.stock} onClick={increaseQuantity}>
                                    <AddIcon />
                                </IconButton>
                            </div>
                            <Button variant="outlined" color="primary" disabled={product.stock < 1} onClick={addToCartHandle}>Add to Cart</Button>
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

                <Button variant="text" startIcon={<CreateRoundedIcon />} className='reviewBtn' onClick={toggleDialog}>
                    Write a review
                </Button>

                <Dialog
                    open={open}
                    onClose={toggleDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">

                    <DialogTitle id="alert-dialog-title"><div className='newReviewHeading'>Rate Product</div></DialogTitle>

                    <DialogContent>
                        <div className='newReviewContent'>
                            <Rating
                                name="simple-controlled"
                                value={rating}
                                onChange={(event, newValue) => {
                                    setRating(newValue);
                                }}
                                sx={{ fontSize: "35px" }}
                            />
                            <TextField
                                id="outlined-multiline-flexible"
                                placeholder='Write a review'
                                multiline
                                rows={4}
                                value={comment}
                                onChange={(e) => { setComment(e.target.value) }}
                            />
                        </div>
                    </DialogContent>

                    <DialogActions>
                        <Button onClick={toggleDialog} color='error'>Cancel</Button>
                        <Button onClick={() => { submitReviewHandle(); toggleDialog(); }} color='success'>Submit</Button>
                    </DialogActions>
                </Dialog>

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