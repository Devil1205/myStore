import React from 'react';
import './Checkout.css';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded';
import OrderSteps from './OrderSteps';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Country, State } from 'country-state-city';

function Checkout() {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { shippingInfo, cartItems } = useSelector(state => state.cart);
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

    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(num);
    }

    const calcGst = (num) => {
        return num * 0.18;
    }

    const calcDelivery = (num) => {
        return num > 2000 ? 0 : 40;
    }

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
                        <div><span>Price </span><span>₹{formatNumber(calcTotalPrice)}</span></div>
                        <div><span>Delivery </span><span>{calcTotalPrice > 2000 ? "Free" : "₹" + formatNumber(40)}</span></div>
                        <div><span>GST@18% </span><span>₹{formatNumber(calcGst(calcTotalPrice + calcDelivery(calcTotalPrice)))}</span></div>
                        <div><span>Total </span><span>₹{formatNumber(calcTotalPrice + calcGst(calcTotalPrice + calcDelivery(calcTotalPrice)) + calcDelivery(calcTotalPrice))}</span></div>
                        <Link to="/shipping"><button className="myStoreBtn">Proceed to pay</button></Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Checkout