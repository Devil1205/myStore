import { ADMIN_ORDER_DETAILS_FAIL, ADMIN_ORDER_DETAILS_REQUEST, ADMIN_ORDER_DETAILS_SUCCESS, ALL_ORDERS_FAIL, ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS, CLEAR_ERRORS, CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, DELETE_ORDER_FAIL, DELETE_ORDER_REQUEST, DELETE_ORDER_SUCCESS, MY_ORDERS_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, ORDER_DETAILS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS } from "../constants/orderConstants"
import axios from 'axios';


//create new order -- admin
export const createOrder = (orderData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
            `${import.meta.env.VITE_ENVIRONMENT==="dev"?import.meta.env.VITE_BASE_API_URL:""}/api/v1/order/new`,
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

//get all products -- admin
export const allOrders = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_ORDERS_REQUEST });
        const { data } = await axios.get(`${import.meta.env.VITE_ENVIRONMENT==="dev"?import.meta.env.VITE_BASE_API_URL:""}/api/v1/admin/orders`, { withCredentials: true });
        dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders })
    } catch (error) {
        console.log(error);
        dispatch({ type: ALL_ORDERS_FAIL, payload: error.response.data.message });
    }
}

//get a particular order -- admin
export const getAdminOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_ORDER_DETAILS_REQUEST });
        const { data } = await axios.get(`${import.meta.env.VITE_ENVIRONMENT==="dev"?import.meta.env.VITE_BASE_API_URL:""}/api/v1/admin/order/${id}`, { withCredentials: true });
        dispatch({ type: ADMIN_ORDER_DETAILS_SUCCESS, payload: data.order })
    } catch (error) {
        dispatch({ type: ADMIN_ORDER_DETAILS_FAIL, payload: error.response.data.message });
    }
}

//update order -- admin
export const updateOrder = (id, orderData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ORDER_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.put(
            `${import.meta.env.VITE_ENVIRONMENT==="dev"?import.meta.env.VITE_BASE_API_URL:""}/api/v1/admin/order/${id}`,
            {
                ...orderData,
                config
            },
            { withCredentials: true }
        );
        dispatch({ type: UPDATE_ORDER_SUCCESS, payload: data.success })
    } catch (error) {
        dispatch({ type: UPDATE_ORDER_FAIL, payload: error.response.data.message });
    }
}

//delete order -- admin
export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ORDER_REQUEST });
        const { data } = await axios.delete(`${import.meta.env.VITE_ENVIRONMENT==="dev"?import.meta.env.VITE_BASE_API_URL:""}/api/v1/admin/order/${id}`, { withCredentials: true });
        dispatch({ type: DELETE_ORDER_SUCCESS, payload: data.success })
    } catch (error) {
        dispatch({ type: DELETE_ORDER_FAIL, payload: error.response.data.message });
    }
}


//get logged in user orders
export const myOrders = () => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDERS_REQUEST });
        const { data } = await axios.get(`${import.meta.env.VITE_ENVIRONMENT==="dev"?import.meta.env.VITE_BASE_API_URL:""}/api/v1/profile/orders`, { withCredentials: true });
        dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders })
    } catch (error) {
        dispatch({ type: MY_ORDERS_FAIL, payload: error.response.data.message });
    }
}


//get a particular order from my orders
export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });
        const { data } = await axios.get(`${import.meta.env.VITE_ENVIRONMENT==="dev"?import.meta.env.VITE_BASE_API_URL:""}/api/v1/order/${id}`, { withCredentials: true });
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