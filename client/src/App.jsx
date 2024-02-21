import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home';
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products';
import Search from './components/Product/Search';
import LoginSignup from './components/User/LoginSignup';
import { useEffect } from 'react';
import store from './store';
import { loadUser } from './actions/userAction';
import UserOptions from './components/layout/Header/userOptions';
import Profile from './components/User/Profile';
import ProtectedRoute from './components/route/ProtectedRoute';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';

function App() {


  useEffect(() => {
    store.dispatch(loadUser());
  }, [])


  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/products" element={<Products />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/login" element={<LoginSignup />} />
          <Route element={<ProtectedRoute />} >
            <Route exact path="/user" element={<UserOptions />} />
            <Route exact path={"/user/profile"} element={<Profile />} />
            <Route exact path={"/user/profile/update"} element={<UpdateProfile />} />
            <Route exact path={"/user/password/update"} element={<UpdatePassword />} />
          </Route>
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
