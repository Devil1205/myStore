import { ADD_TO_CART } from "../constants/cartConstants";
import axios from 'axios';

export const addItemsToCart = (product, quantity) => async (dispatch, getState) => {
    dispatch({
        type: ADD_TO_CART,
        payload: {
            id: product._id,
            name: product.name,
            image: product.images[0].url,
            price: product.price,
            stock: product.stock,
            quantity
        }
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}