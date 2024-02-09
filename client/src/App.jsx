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
          <Route exact path="/account" element={<UserOptions />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
