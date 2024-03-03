import React, { useEffect, useState } from 'react';
import './Checkout.css';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded';
import OrderSteps from './OrderSteps';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Country, State } from 'country-state-city';
import { formatNumber } from '../../App';

function Checkout() {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { shippingInfo, cartItems } = useSelector(state => state.cart);
    const [subTotal, setSubTotal] = useState("");
    const [delivery, setDelivery] = useState("");
    const [tax, setTax] = useState("");
    const [totalPrice, setTotalPrice] = useState("");
    // const cartItems = [
    //     {
    //         id: "65b00183b987d41afcd385f0",
    //         name: "Vivo X100",
    //         image: "https://images.indianexpress.com/2023/11/Vivo-X100-2.jpg",
    //         price: 63000,
    //         stock: 2,
    //         quantity: 2,
    //     },
    //     {
    //         id: "65b00183b987d41afcd385f0",
    //         name: "Vivo X100",
    //         image: "https://images.indianexpress.com/2023/11/Vivo-X100-2.jpg",
    //         price: 63000,
    //         stock: 2,
    //         quantity: 2,
    //     },
    //     {
    //         id: "65b00183b987d41afcd385f0",
    //         name: "Vivo X100",
    //         image: "https://images.indianexpress.com/2023/11/Vivo-X100-2.jpg",
    //         price: 63000,
    //         stock: 2,
    //         quantity: 2,
    //     },
    // ]
    const calcTotalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const calcGst = (num) => {
        return num * 0.18;
    }

    const calcDelivery = (num) => {
        return num > 2000 ? 0 : 40;
    }

    const checkoutSubmitHandle = () => {
        const orderData = {
            subTotal,
            delivery,
            tax,
            totalPrice
        }
        sessionStorage.setItem("orderInfo", JSON.stringify(orderData));
        navigate("/payment");
    }

    useEffect(() => {
        if (cartItems.length === 0)
            navigate("/cart");
        setSubTotal((Number(calcTotalPrice)).toFixed(2));
        setDelivery(calcTotalPrice > 2000 ? 0 : 40);
        setTax((Number(calcGst(calcTotalPrice + calcDelivery(calcTotalPrice)))).toFixed(2));
        setTotalPrice(Number((calcTotalPrice + calcGst(calcTotalPrice + calcDelivery(calcTotalPrice)) + calcDelivery(calcTotalPrice))).toFixed(2));
    }, [])


    return (
        <div className='checkout'>
            <OrderSteps activePage={1} />
            <div className='checkoutContainer'>

                <div>
                    <div className="checkoutBlock-1">
                        <div className="checkoutItemHeading">
                            <LocalShippingRoundedIcon sx={{ color: "tomato" }} />
                            <div>Shipping Details</div>
                            <Link to="/shipping"> <button className='myStoreEditBtn'>Edit</button></Link>
                        </div>
                        <div>{shippingInfo.address},</div>
                        <div>{`${shippingInfo.city}, ${State.getStateByCodeAndCountry(shippingInfo.state, shippingInfo.country).name}-${shippingInfo.pincode}`},</div>
                        <div>{`${Country.getCountryByCode(shippingInfo.country).name}`}</div>
                        <div className='my-2'><b>Phone: </b>{shippingInfo.phoneNo}</div>
                    </div>

                    <div className="checkoutBlock-2">
                        <div className="checkoutItemHeading">
                            <ShoppingBasketRoundedIcon sx={{ color: "tomato" }} />
                            <div>Order Summary</div>
                            <Link to="/cart"> <button className='myStoreEditBtn'>Edit</button></Link>
                        </div>
                        <div>
                            {cartItems.map((elem, ind) => {
                                return (
                                    <div key={ind} className='checkoutCartItem'>
                                        <div>
                                            <img src={elem.image} alt={elem.name} />
                                            <div>Qty x{elem.quantity}</div>
                                        </div>
                                        <div>
                                            <div>{elem.name}124 adsfdasdfdsfdsf 234324 dsgfdsf</div>
                                            <div>₹{elem.price}</div>
                                            <div>Subtotal : ₹{elem.quantity * elem.price}</div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                <div className="checkoutBlock-3">
                    <div className="checkoutItemHeading">
                        <AccountBalanceRoundedIcon sx={{ color: "tomato" }} />
                        <div>Payment</div>
                    </div>
                    <div className='checkoutTotal'>
                        <div><span>Price </span><span>₹{formatNumber(subTotal)}</span></div>
                        <div><span>Delivery </span><span>{delivery === 0 ? "Free" : "₹" + formatNumber(delivery)}</span></div>
                        <div><span>GST@18% </span><span>₹{formatNumber(tax)}</span></div>
                        <div><span>Total </span><span>₹{formatNumber(totalPrice)}</span></div>
                        <button className="myStoreBtn" onClick={checkoutSubmitHandle}>Proceed to pay</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Checkout