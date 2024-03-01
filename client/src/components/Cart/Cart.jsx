import React, { useEffect, useState } from 'react';
import './Cart.css';
import CartItem from './CartItem';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useSelector } from 'react-redux';
import shoppingCart from '../../Images/shoppingCart.gif';
import { Link } from 'react-router-dom';

function Cart() {

    const { cartItems } = useSelector(state => state.cart);
    const [totalPrice, setTotalPrice] = useState(0);

    const item = {
        name: "Vivo X100 16GB 256GB Pro Max Blue Color",
        price: 60000,
        image: "https://images.indianexpress.com/2023/11/Vivo-X100-2.jpg",
        quantity: 1,
        id: "65b00183b987d41afcd385f0",
        category: "Phone",
        stock: 3
    }

    const calcTotalPrice = cartItems.reduce((acc, product) => acc + product.price * product.quantity, 0);

    return (
        cartItems.length === 0 ?
            <>
                <div className="cartEmptyContainer">
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
                        <div><span>Price(4 items) </span><span>₹{calcTotalPrice}</span></div>
                        <div><span>Delivery </span><span>₹40</span></div>
                        <div><span>Total </span><span>₹{calcTotalPrice + 40}</span></div>
                        <Link to="/shipping"><button className="myStoreBtn">Proceed</button></Link>
                    </div>
                </div>
            </>
    )
}

export default Cart