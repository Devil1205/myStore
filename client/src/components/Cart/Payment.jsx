import React, { useEffect, useRef } from 'react';
import './Payment.css';
import '../User/LoginSignup.css';
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements
} from '@stripe/react-stripe-js';
import axios from 'axios';
import MetaData from '../layout/MetaData';
import OrderSteps from './OrderSteps';
import CreditCardRoundedIcon from '@mui/icons-material/CreditCardRounded';
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import { formatNumber } from '../../App';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

function Payment() {

    const backend = "http://localhost:5000";
    const order = sessionStorage.getItem("orderInfo") ? JSON.parse(sessionStorage.getItem("orderInfo")) : "";
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user);
    const { shippingInfo } = useSelector(state => state.cart);
    const paymentBtn = useRef(null);
    const alert = useAlert();
    const stripe = useStripe();
    const elements = useElements();

    const paymentData = {
        amount: Math.round(order.totalPrice * 100)
    }

    const submitPaymentForm = async (e) => {
        e.preventDefault();
        paymentBtn.current.disabled = true;

        try {
            const config = { headers: { "Content-Type": "application/json" } };
            const { data } = await axios.post(
                `${backend}/api/v1/payment/process`,
                {
                    ...paymentData,
                    config
                },
                { withCredentials: true }
            );

            const client_secret = data.client_secret;

            if (!stripe || !elements)
                return;
            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pincode,
                            country: shippingInfo.country
                        }
                    }
                }
            });
            if (result.error) {
                alert.error(result.error.message);
                paymentBtn.current.disabled = false;
            }
            else {
                if (result.paymentIntent.status === "succeeded") {
                    sessionStorage.removeItem("orderInfo");
                    navigate("success");
                }
                else {
                    alert.error("Couldn't complete the payment");
                }
            }

        } catch (error) {
            console.log(error);
            alert.error(error.response.data.message);
            paymentBtn.current.disabled = false;
        }
    }

    useEffect(() => {
        if (!order) {
            navigate("/cart");
        }
    }, [])


    return (
        <>
            < div className='loginSignupContainer shippingInfoContainer' >
                <OrderSteps activePage={2} />
                <div className="loginSignupBox paymentBox">
                    <MetaData title="myStore - Payment" />

                    <form className="loginForm" encType='multipart/form-data' onSubmit={submitPaymentForm}>
                        <h3 className='text-center mb-5'>Payment</h3>

                        <div className="signupName">
                            <CreditCardRoundedIcon />
                            <CardNumberElement className='paymentInput' />
                        </div>

                        <div className="signupEmail">
                            <EventRoundedIcon />
                            <CardExpiryElement className='paymentInput' />
                        </div>

                        <div className="signupEmail">
                            <VpnKeyRoundedIcon />
                            <CardCvcElement className='paymentInput' />
                        </div>
                        <button className="signupSubmit" type='submit' ref={paymentBtn} >Pay ₹{order && formatNumber(order.totalPrice)}</button>
                    </form>
                </div>
            </div >
        </>
    )
}

export default Payment