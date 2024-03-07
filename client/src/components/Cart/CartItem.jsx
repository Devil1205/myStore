import React, { useState } from 'react';
import './CartItem.css';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link } from 'react-router-dom';
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction';
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';

function CartItem({ item }) {

    const [quantity, setQuantity] = useState(item.quantity);
    const dispatch = useDispatch();
    const alert = useAlert();

    const increaseQuantity = () => {
        if (quantity >= item.stock)
            return;
        setQuantity(quantity + 1);
        addToCartHandle(quantity + 1);
    }

    const decreaseQuantity = () => {
        if (quantity <= 1)
            return;
        setQuantity(quantity - 1);
        addToCartHandle(quantity - 1);
    }

    const addToCartHandle = (qty) => {
        const product = {
            "_id": item.id,
            "name": item.name,
            "images": [{ url: item.image }],
            "price": item.price,
            "stock": item.stock,
        };
        dispatch(addItemsToCart(product, qty));
        alert.success("Item updated in cart");
    
    }
    const removeFromCartHandle = () => {
        const product = {
            "_id": item.id,
        };
        // console.log(item.id);
        dispatch(removeItemsFromCart(product));
        alert.success("Item removed from cart");
    }

    return (
        <div className="cartItem">

            <div className="cartItemBlock-1">
                <Link to={`/product/${item.id}`}>
                    <img src={item.image} alt={item.name} />
                </Link>

                <div className="cartItemBlock-1-1">
                    <IconButton color="error" aria-label="decrease qty" disabled={quantity <= 1} onClick={decreaseQuantity}>
                        <RemoveIcon />
                    </IconButton>
                    <span>{quantity}</span>
                    <IconButton color="success" aria-label="increase qty" disabled={quantity >= item.stock} onClick={increaseQuantity}>
                        <AddIcon />
                    </IconButton>
                </div>

            </div>

            <div className="cartItemBlock-2">
                <Link to={`/product/${item.id}`}>
                    <h5>{item.name}</h5>
                    <div>₹{item.price}</div>
                </Link>
                <button className="myStoreBtn2 cartBtn" onClick={()=>{removeFromCartHandle()}}>Remove</button>
                <div>Subtotal : ₹{item.price * quantity}</div>
            </div>
        </div >
    )
}

export default CartItem