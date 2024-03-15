import React, { useEffect, useState } from 'react';
import './UpdateOrder.css';
import '../../Order/OrderDetails.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import LocalShippingRoundedIcon from '@mui/icons-material/LocalShippingRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded';
import { Country, State } from 'country-state-city';
import '../../Cart/Checkout.css';
import Loader from '../../layout/Loader/Loader';
import { getAdminOrderDetails, clearErrors, updateOrder } from '../../../actions/orderAction';
import { formatNumber } from '../../../App';
import MetaData from '../../layout/MetaData';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { UPDATE_ORDER_RESET } from '../../../constants/orderConstants';

function UpdateOrder() {

    const statusArr = ["Processing", "Shipped", "Delivered"];
    const params = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { loading: orderLoading, order } = useSelector(state => state.orderDetails);
    const { loading, error, isUpdated } = useSelector(state => state.adminOrder);
    const [status, setStatus] = useState("");

    const submitOrderForm = (e) => {
        e.preventDefault();

        if (!status) {
            alert.error("Order status is required");
            return;
        }

        const data = {
            orderStatus: status
        };
        dispatch(updateOrder(params.id, data));
    }

    useEffect(() => {
        if (!loading) {
            if (error) {
                alert.error(error);
                dispatch(clearErrors());
            }
            if (isUpdated) {
                alert.success("Order updated successfully");
                dispatch({ type: UPDATE_ORDER_RESET });
                dispatch(getAdminOrderDetails(params.id));
            }
        }

        if (!order || order._id !== params.id)
            dispatch(getAdminOrderDetails(params.id));

        if (order && order._id === params.id) {
            setStatus(order.orderStatus);
        }
    }, [dispatch, alert, error, order, isUpdated])

    return (
        !order || order._id !== params.id ?
            <Loader /> :
            <div className="checkout">
                <MetaData title={"myStore Admin - Update Order"} />
                <div className='checkoutContainer updateOrderContainer'>

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
                                                <div><span>Order Status  :  </span><span className={order.orderStatus === statusArr[2] ? "successColor" : "failColor"}>{order.orderStatus}</span></div>
                                                <div className='text-secondary'>Ordered On : {new Date(order.paidAt).toLocaleString()}</div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <div>
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
                        <div>
                            <div>
                                <FormControl sx={{ m: 1, width: "100%", maxWidth: "100%", margin: "0px" }}>
                                    <TextField
                                        value={status}
                                        onChange={(e) => { setStatus(e.target.value) }}
                                        select // tell TextField to render select
                                        label="Order Status"
                                        size='small'
                                    >
                                        {statusArr.map((elem, ind) => {
                                            return (
                                                <MenuItem disabled={(statusArr.indexOf(order.orderStatus))!=ind-1   } value={elem} key={ind}>{elem}</MenuItem>
                                            )
                                        })}
                                    </TextField>
                                </FormControl>
                            </div>
                            <div className='submitButtons mt-3'>
                                <button className="myStoreBtn" disabled={(loading ? true : false) || (statusArr[2]===order.orderStatus)} onClick={submitOrderForm}>Update</button>
                                <button className="myStoreBtn2" disabled={loading ? true : false} onClick={() => { navigate("/admin/dashboard") }}>Cancel</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
    )
}

export default UpdateOrder