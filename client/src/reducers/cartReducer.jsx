import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, action) => {
    switch (action.type) {

        case ADD_TO_CART:
            {
                const product = action.payload;
                const ind = state.cartItems.findIndex(elem => elem.id === product.id);

                //if product not present in cart
                if (ind === -1) {
                    state.cartItems.push(product);
                }
                //if product aldready present in cart
                else {
                    state.cartItems[ind] = product;
                }

                return {
                    ...state
                }
            }

        case REMOVE_FROM_CART:
            {
                const product = action.payload;
                state.cartItems = state.cartItems.filter(elem => elem.id !== product.id);

                return {
                    ...state
                }
            }

        case SAVE_SHIPPING_INFO:
            {
                state.shippingInfo = action.payload;
                return {
                    ...state,
                }
            }

        default:
            return state;
    }
}