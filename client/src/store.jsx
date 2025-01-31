import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { allReviewsReducer, deleteProductReducer, deleteReviewReducer, newProductReducer, newReviewReducer, productDetailsReducer, productReducer } from './reducers/productReducer';
import { userReducer, profileReducer, forgotPasswordReducer, allUsersReducer, userDetailsReducer, updateUserReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, updateOrderReducer } from './reducers/orderReducer';

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  adminProduct: deleteProductReducer,
  allOrders: allOrdersReducer,
  adminOrder: updateOrderReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  adminUser: updateUserReducer,
  allReviews: allReviewsReducer,
  adminReview: deleteReviewReducer
});

const middleware = [thunk];
let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    shippingInfo: localStorage.getItem("shippingInfo") ? JSON.parse(localStorage.getItem("shippingInfo")): {}
  }
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;