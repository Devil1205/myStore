import { CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS } from "../constants/orderConstants"
import axios from 'axios';
const backend = "http://localhost:5000";

export const createOrder = (orderData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
            `${backend}/api/v1/order/new`,
            {
                ...orderData,
                config
            },
            { withCredentials: true }
        );
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data.order })
    } catch (error) {
        dispatch({ type: CREATE_ORDER_FAIL, payload: error.response.data.message });
    }

}

export const myOrders = () => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDERS_REQUEST });
        const { data } = await axios.get(`${backend}/api/v1/profile/orders`, { withCredentials: true });
        dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders })
    } catch (error) {
        dispatch({ type: MY_ORDERS_FAIL, payload: error.response.data.message });
    }
}

export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });
        const { data } = await axios.get(`${backend}/api/v1/order/${id}`, { withCredentials: true });
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order })
    } catch (error) {
        dispatch({ type: ORDER_DETAILS_FAIL, payload: error.response.data.message });
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
}