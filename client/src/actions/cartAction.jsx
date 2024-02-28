import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cartConstants";

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

export const removeItemsFromCart = (product) => (dispatch, getState) => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload: {
            id: product._id
        }
    })
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}