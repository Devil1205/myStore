import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import MyOrders from './components/Order/MyOrders';
import OrderDetails from './components/Order/OrderDetails';
import Dashboard from './components/admin/Dashboard/Dashboard';
import AdminRoute from './components/route/AdminRoute';
import AdminProducts from './components/admin/Products/Products';
import NewProduct from './components/admin/Products/NewProduct';
import UpdateProduct from './components/admin/Products/UpdateProduct';
import Orders from './components/admin/Orders/Orders';
import UpdateOrder from './components/admin/Orders/UpdateOrder';
import Users from './components/admin/Users/Users';
import UpdateUser from './components/admin/Users/UpdateUser';
import Reviews from './components/admin/Reviews/Reviews';
import About from './components/About/About';

export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(num);
}

export const convertBackToNumber = (num) => {
  return Number(num.slice(0, num.indexOf(".")).match(/\d/g).join(""));
}

function App() {
  const backend = "http://localhost:5000";

  const [stripeApiKey, setStripeApiKey] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchStripeApiKey = async () => {
    try {
      setLoading(false);
      const { data } = await axios.get(`${backend}/api/v1/payment/getApiKey`, { withCredentials: true });
      setStripeApiKey(data.key);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    store.dispatch(loadUser());
    fetchStripeApiKey();
  }, [store.dispatch])


  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/login" element={<LoginSignup />} />
          <Route exact path={"/password/forgot"} element={<ForgotPassword />} />
          <Route exact path={"/password/reset/:token"} element={<ResetPassword />} />

          {/* protected routes -- login required*/}
          <Route element={<ProtectedRoute />} >
            <Route exact path="/user" element={<UserOptions />} />
            <Route exact path={"/user/profile"} element={<Profile />} />
            <Route exact path={"/user/profile/update"} element={<UpdateProfile />} />
            <Route exact path={"/user/password/update"} element={<UpdatePassword />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/shipping" element={<ShippingInfo />} />
            <Route exact path="/checkout" element={<Checkout />} />
            <Route exact path="/payment/success" element={<OrderSuccess />} />
            <Route exact path="/orders" element={<MyOrders />} />
            <Route exact path="/order/:id" element={<OrderDetails />} />

            {/* admin routes -- admin permission required */}
            <Route element={<AdminRoute />}>
              <Route exact path="/admin/dashboard" element={<Dashboard />} />
              <Route exact path="/admin/products" element={<AdminProducts />} />
              <Route exact path="/admin/product/new" element={<NewProduct />} />
              <Route exact path="/admin/product/:id" element={<UpdateProduct />} />
              <Route exact path="/admin/orders" element={<Orders />} />
              <Route exact path="/admin/order/:id" element={<UpdateOrder />} />
              <Route exact path="/admin/users" element={<Users />} />
              <Route exact path="/admin/user/:id" element={<UpdateUser />} />
              <Route exact path="/admin/reviews" element={<Reviews />} />
            </Route>

            {/* payment route */}
            <Route exact path="/payment" element={!loading && stripeApiKey ? <Elements stripe={loadStripe(stripeApiKey)}><Payment /></Elements> : <Navigate to="/cart" />} />

          </Route>

        </Routes>
        <Footer />
      </Router >
    </>
  )
}

export default App
