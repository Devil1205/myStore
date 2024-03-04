import React, { useEffect } from 'react';
import './OrderSuccess.css';
import OrderPlacedImage from '../../Images/OrderPlaced.svg';
import OrderSteps from './OrderSteps';
import { useSelector } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { useNavigate } from 'react-router-dom';

function OrderSuccess() {

    const { order, loading } = useSelector(state => state.order);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            if (!order)
                navigate("/payment");
            else {
                sessionStorage.removeItem("orderInfo");
            }
        }
    }, [loading])


    return (
        loading || !order ?

            <Loader /> :

            <div className='orderSuccess'>
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