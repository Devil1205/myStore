import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home';
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products';
import Search from './components/Product/Search';
import LoginSignup from './components/User/LoginSignup';
import { useEffect, useState } from 'react';
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from './components/layout/Header/userOptions';
import Profile from './components/User/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import Cart from './components/Cart/Cart';
import ShippingInfo from './components/Cart/ShippingInfo';
import Checkout from './components/Cart/Checkout';
import axios from 'axios';
import Payment from './components/Cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './components/Cart/OrderSuccess';

export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
  }).format(num);
}

function App() {
  const backend = "http://localhost:5000";

  const [stripeApiKey, setStripeApiKey] = useState("");

  const fetchStripeApiKey = async () => {
    try {
      const { data } = await axios.get(`${backend}/api/v1/payment/getApiKey`, { withCredentials: true });
      setStripeApiKey(data.key);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    store.dispatch(loadUser());
    fetchStripeApiKey();
  }, [])


  return (
    <>
      <Router>
        <Header />
        {stripeApiKey && <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/home" element={<Home />} />
            <Route exact path="/product/:id" element={<ProductDetails />} />
            <Route exact path="/products" element={<Products />} />
            <Route exact path="/search" element={<Search />} />
            <Route exact path="/login" element={<LoginSignup />} />

            {/* protected routes -- login required*/}
            <Route element={<ProtectedRoute />} >
              <Route exact path="/user" element={<UserOptions />} />
              <Route exact path={"/user/profile"} element={<Profile />} />
              <Route exact path={"/user/profile/update"} element={<UpdateProfile />} />
              <Route exact path={"/user/password/update"} element={<UpdatePassword />} />
              <Route exact path="/cart" element={<Cart />} />
              <Route exact path="/shipping" element={<ShippingInfo />} />
              <Route exact path="/checkout" element={<Checkout />} />
              <Route exact path="/payment" element={<Payment />} />
              <Route exact path="/payment/success" element={<OrderSuccess />} />
            </Route>

            <Route exact path={"/password/forgot"} element={<ForgotPassword />} />
            <Route exact path={"/password/reset/:token"} element={<ResetPassword />} />
          </Routes>
        </Elements>}
        <Footer />
      </Router >
    </>
  )
}

export default App
