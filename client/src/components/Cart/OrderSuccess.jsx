import React, { useEffect } from 'react';
import './OrderSuccess.css';
import OrderPlacedImage from '../../Images/OrderPlaced.svg';
import OrderSteps from './OrderSteps';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { CREATE_ORDER_RESET } from '../../constants/orderConstants';
import MetaData from '../layout/MetaData';
import { RESET_CART } from '../../constants/cartConstants';

function OrderSuccess() {

    const { order, loading } = useSelector(state => state.newOrder);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!loading) {
            if (!order)
                navigate("/payment");
            else {
                sessionStorage.removeItem("orderInfo");
                localStorage.setItem("cartItems",JSON.stringify([]));
                dispatch({ type: CREATE_ORDER_RESET });
                dispatch({ type: RESET_CART });
            }
        }
    }, [loading])


    return (
        loading ?

            <Loader /> :

            <div className='orderSuccess'>
                <MetaData title="myStore - Order Placed" />
                <OrderSteps activePage={3} />
                <div className="orderSuccessContainer">
                    <img src={OrderPlacedImage} alt="Order Placed" />
                    <div>
                        <div>Thank you for your order</div>
                        <p>Your order has been placed successfully, estimated shipping is 3-5 days which may vary according to shipping location.</p>
                        <button className='myStoreBtn'>My Orders</button>
                    </div>
                </div>
            </div>
    )
}

export default OrderSuccess