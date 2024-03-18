import React, { useEffect } from 'react';
import './OrderDetails.css';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, getOrderDetails } from '../../actions/orderAction';
import Loader from '../layout/Loader/Loader';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded';
import { Country, State } from 'country-state-city';
import { formatNumber } from '../../App';
import '../Cart/Checkout.css';
import MetaData from '../layout/MetaData';

function OrderDetails() {

    const params = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, order } = useSelector(state => state.orderDetails);
    const { user } = useSelector(state => state.user);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getOrderDetails(params.id));
    }, [dispatch, alert, error])


    return (
        loading || !order ?
            <Loader /> :
            <div className="checkout">
            <MetaData title={`${user && user.name} - Order ${order._id}`} />
                <div className='checkoutContainer'>

                    <div>
                        <div className="checkoutBlock-1">
                            <div className="checkoutItemHeading">
                                <LocalShippingRoundedIcon sx={{ color: "tomato" }} />
                                <div>Shipping Details</div>
                            </div>
                            <div>{order.shippingInfo.address},</div>
                            <div>{`${order.shippingInfo.city}, ${State.getStateByCodeAndCountry(order.shippingInfo.state, order.shippingInfo.country).name}-${order.shippingInfo.pincode}`},</div>
                            <div>{`${Country.getCountryByCode(order.shippingInfo.country).name}`}</div>
                            <div className='my-2'><b>Phone: </b>{order.shippingInfo.phoneNo}</div>
                        </div>

                        <div className="checkoutBlock-2 orderBlock-2">
                            <div className="checkoutItemHeading">
                                <ShoppingBasketRoundedIcon sx={{ color: "tomato" }} />
                                <div>Order Summary</div>
                            </div>
                            <div>
                                {order.orderItems.map((elem, ind) => {
                                    return (
                                        <div key={ind}>
                                            <h6 className='text-secondary'>Order ID : {order._id}</h6>
                                            <div className='checkoutCartItem orderItem'>
                                                <div>
                                                    <img src={elem.image} alt={elem.name} />
                                                    <div>Qty x{elem.quantity}</div>
                                                </div>
                                                <div>
                                                    <div>{elem.name}</div>
                                                    <div>₹{elem.price}</div>
                                                    <div>Subtotal : ₹{elem.quantity * elem.price}</div>
                                                </div>
                                            </div>
                                            <div>
                                                <div><span>Order Status  :  </span><span className={elem.status === "delivered" ? "successColor" : "failColor"}>{order.orderStatus}</span></div>
                                                <div className='text-secondary'>Ordered On : {new Date(order.paidAt).toLocaleString()}</div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="checkoutBlock-3 orderBlock-3">
                        <div>
                            <div className="checkoutItemHeading orderItemHeading">
                                <AccountBalanceRoundedIcon sx={{ color: "tomato" }} />
                                <div>Payment</div>
                            </div>
                            <h6 className='text-secondary'>Payment ID : {order.paymentInfo.id}</h6>
                        </div>
                        <div className='checkoutTotal orderTotal'>
                            <div><span>Price </span><span>₹{formatNumber(order.itemPrice)}</span></div>
                            <div><span>Delivery </span><span>{order.shippingPrice === 0 ? "Free" : "₹" + formatNumber(order.shippingPrice)}</span></div>
                            <div><span>GST@18% </span><span>₹{formatNumber(order.taxPrice)}</span></div>
                            <div><span>Total </span><span>₹{formatNumber(order.totalPrice)}</span></div>
                            <div><span>Status </span><span className={order.paymentInfo.status === "succeeded" ? "successColor" : "failColor"}>{order.paymentInfo.status}</span></div>
                        </div>
                    </div>

                </div>
            </div>
    )
}

export default OrderDetails