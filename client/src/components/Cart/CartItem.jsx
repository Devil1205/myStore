import React, { useState } from 'react';
import './CartItem.css';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Link } from 'react-router-dom';
import { addItemsToCart } from '../../actions/cartAction';

function CartItem({ item }) {

    const [quantity, setQuantity] = useState(item.quantity);

    const increaseQuantity = () => {
        if (quantity >= item.stock)
            return;
        setQuantity(quantity + 1);
        addToCartHandle();
    }

    const decreaseQuantity = () => {
        if (quantity <= 1)
            return;
        setQuantity(quantity - 1);
        addToCartHandle();
    }

    const addToCartHandle = () => {
        dispatch(addItemsToCart(item, quantity));
        alert.success("Item added to cart")
    }

    return (
        <div className="cartItem">

            <div className="cartItemBlock-1">
                <Link to={`/product/${item.id}`}>
                    <img src={item.image} alt={item.name} />
                </Link>

                <div className="cartItemBlock-1-1">
                    <IconButton color="error" aria-label="decrease qty" onClick={decreaseQuantity}>
                        <RemoveIcon />
                    </IconButton>
                    <span>{item.quantity}</span>
                    <IconButton color="success" aria-label="increase qty" onClick={increaseQuantity}>
                        <AddIcon />
                    </IconButton>
                </div>

            </div>

            <div className="cartItemBlock-2">
                <Link to={`/product/${item.id}`}>
                    <h5>{item.name}</h5>
                    <div>₹{item.price}</div>
                </Link>
                <button className="myStoreBtn cartBtn">Remove</button>
                <div>Subtotal : ₹{item.price * item.quantity}</div>
            </div>
        </div >
    )
}

export default CartItem