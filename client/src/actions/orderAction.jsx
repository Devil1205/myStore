import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS } from "../constants/orderConstants"
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
        console.log(error);
        dispatch({ type: CREATE_ORDER_FAIL, payload: error.response.data.message });
    }

}