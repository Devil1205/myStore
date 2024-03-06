import React, { useEffect, useRef, useState } from 'react';
import './ShippingInfo.css';
import '../User/LoginSignup.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import LocationCityRoundedIcon from '@mui/icons-material/LocationCityRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Country, State } from 'country-state-city';
import { saveShippingInfo } from '../../actions/cartAction';
import LocalPhoneRoundedIcon from '@mui/icons-material/LocalPhoneRounded';
import OrderSteps from './OrderSteps';

function ShippingInfo() {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { shippingInfo, cartItems } = useSelector(state => state.cart);

    const [address, setAddress] = useState(shippingInfo.address ? shippingInfo.address : "");
    const [city, setCity] = useState(shippingInfo.city ? shippingInfo.city : "");
    const [state, setState] = useState(shippingInfo.state ? shippingInfo.state : "");
    const [pincode, setPincode] = useState(shippingInfo.pincode ? shippingInfo.pincode : "");
    const [country, setCountry] = useState(shippingInfo.country ? shippingInfo.country : "");
    const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo ? shippingInfo.phoneNo : "");

    const submitSignupForm = (e) => {
        e.preventDefault();
        const data = {
            address,
            city,
            state,
            pincode,
            country,
            phoneNo
        }
        if (!data.address) {
            e.target[0].focus();
            alert.error("Address is required");
            return false;
        }
        if (!data.city) {
            e.target[1].focus();
            alert.error("City is required");
            return false;
        }
        if (!data.pincode) {
            e.target[2].focus();
            alert.error("Pincode is required");
            return false;
        }
        if (!data.country) {
            e.target[3].focus();
            alert.error("Country is required");
            return false;
        }
        if (!data.state) {
            e.target[4].focus();
            alert.error("State is required");
            return false;
        }
        dispatch(saveShippingInfo(data));
        navigate("/checkout");
    }

    useEffect(() => {
        if (cartItems.length === 0)
            navigate("/cart");
    }, [])


    return (
        < div className='loginSignupContainer shippingInfoContainer' >
            <OrderSteps activePage={0} />
            <div className="loginSignupBox shippingInfoBox">
                <MetaData title={`myStore - Shipping Details`} />


                <form className="loginForm" encType='multipart/form-data' onSubmit={submitSignupForm}>
                    <h3 className='text-center mb-5'>Shipping Details</h3>

                    <div className="signupName">
                        <HomeRoundedIcon sx={{ color: "rgb(166 166 166)" }} />
                        <input type="text" placeholder="Address" value={address} name="address" onChange={(e) => setAddress(e.target.value)} />
                    </div>

                    <div className="signupEmail">
                        <LocationCityRoundedIcon sx={{ color: "rgb(166 166 166)" }} />
                        <input type="text" placeholder="City" value={city} name="city" onChange={(e) => setCity(e.target.value)} />
                    </div>

                    <div className="signupEmail">
                        <PlaceRoundedIcon sx={{ color: "rgb(166 166 166)" }} />
                        <input type="number" placeholder="Pincode" value={pincode} name="pincode" onChange={(e) => setPincode(e.target.value)} />
                    </div>

                    <div className="signupEmail">
                        <LocalPhoneRoundedIcon sx={{ color: "rgb(166 166 166)" }} />
                        <input type="phone" placeholder="Phone" value={phoneNo} name="phone" onChange={(e) => setPhoneNo(e.target.value)} />
                    </div>

                    <div>
                        <FormControl sx={{ m: 1, width: "100%", maxWidth: "100%" }}>
                            <TextField
                                value={country}
                                onChange={(e) => { setCountry(e.target.value) }}
                                select // tell TextField to render select
                                label="Country"
                                size='small'
                            >
                                {Country.getAllCountries().map((elem, ind) => {
                                    return (
                                        <MenuItem value={elem.isoCode} key={elem.isoCode}>{elem.name}</MenuItem>
                                    )
                                })}
                            </TextField>
                        </FormControl>
                    </div>

                    <div>
                        <FormControl sx={{ m: 1, width: "100%", maxWidth: "100%" }}>
                            <TextField
                                value={state}
                                onChange={(e) => { setState(e.target.value) }}
                                select // tell TextField to render select
                                label="State"
                                size='small'
                            >
                                {Country && State.getStatesOfCountry(country).map((elem, ind) => {
                                    return (
                                        <MenuItem value={elem.isoCode} key={elem.isoCode}>{elem.name}</MenuItem>
                                    )
                                })}
                            </TextField>
                        </FormControl>
                    </div>

                    <button className="signupSubmit" type='submit' >Checkout</button>
                </form>
            </div>
        </div >
    )
}

export default ShippingInfo