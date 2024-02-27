import React from 'react';
import './Cart.css';
import CartItem from './CartItem';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

function Cart() {

    const item = {
        name: "Vivo X100 16GB 256GB Pro Max Blue Color",
        price: 60000,
        image: "https://images.indianexpress.com/2023/11/Vivo-X100-2.jpg",
        quantity: 1,
        id: "65b00183b987d41afcd385f0",
        category: "Phone"
    }

    return (
        <>
            <div className='cartContainer'>

                <div className="cartItems">
                    <div className="cartHeading">
                        <div><ShoppingCartOutlinedIcon sx={{ color: "tomato", fontSize: "25px" }} /> My Cart (2)</div>
                    </div>
                    <CartItem item={item} />
                </div>

                <div className="cartTotal">
                    <div className="cartHeading">
                        <div>Price Details</div>
                    </div>
                    <div><span>Price(4 items) </span><span>₹2000</span></div>
                    <div><span>Delivery </span><span>₹40</span></div>
                    <div><span>Total </span><span>₹2040</span></div>
                </div>
            </div>
        </>
    )
}

export default Cart