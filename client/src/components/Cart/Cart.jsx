import React, { useEffect, useState } from 'react';
import './Cart.css';
import CartItem from './CartItem';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useSelector } from 'react-redux';
import shoppingCart from '../../Images/shoppingCart.gif';
import { Link } from 'react-router-dom';
import { formatNumber } from '../../App';
import MetaData from '../layout/MetaData';

function Cart() {

    const { cartItems } = useSelector(state => state.cart);
    const [subTotal, setSubTotal] = useState("");
    const [delivery, setDelivery] = useState("");
    const [tax, setTax] = useState("");
    const [totalPrice, setTotalPrice] = useState("");

    const calcTotalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const calcGst = (num) => {
        return num * 0.18;
    }

    const calcDelivery = (num) => {
        return num > 2000 ? 0 : 40;
    }

    useEffect(() => {
        if (cartItems.length !== 0) {
            setSubTotal((Number(calcTotalPrice)).toFixed(2));
            setDelivery(calcTotalPrice > 2000 ? 0 : 40);
            setTax((Number(calcGst(calcTotalPrice + calcDelivery(calcTotalPrice)))).toFixed(2));
            setTotalPrice(Number((calcTotalPrice + calcDelivery(calcTotalPrice))).toFixed(2));
        }
    }, [calcTotalPrice])

    return (
        cartItems.length === 0 ?
            <>
                <div className="cartEmptyContainer">
                    <MetaData title="myStore - Cart" />
                    <img src={shoppingCart} alt="Shopping Cart" width={200} />
                    <div>
                        Your cart is empty!
                    </div>
                    <Link to="/products">
                        <button className="myStoreBtn">Shop now</button>
                    </Link>
                </div>
            </> :
            <>
                <div className='cartContainer'>
                    <MetaData title="myStore - Cart" />

                    <div className="cartItems">
                        <div className="cartHeading">
                            <div><ShoppingCartOutlinedIcon sx={{ color: "tomato", fontSize: "25px" }} /> My Cart (2)</div>
                        </div>

                        {cartItems.map((item, ind) => {
                            return (
                                <CartItem item={item} key={ind} />
                            )
                        })}
                        {/* <CartItem item={item}/> */}

                    </div>

                    <div className="cartTotal">
                        <div className="cartHeading">
                            <div>Price Details</div>
                        </div>
                        <div><span>Price({cartItems.length} items) </span><span>₹{formatNumber(subTotal)}</span></div>
                        <div><span>Delivery </span><span>{delivery === 0 ? "Free" : "₹" + formatNumber(delivery)}</span></div>
                        <div><span>Total </span><span>₹{formatNumber(totalPrice)}</span></div>
                        <Link to="/shipping"><button className="myStoreBtn">Proceed</button></Link>
                    </div>
                </div>
            </>
    )
}

export default Cart