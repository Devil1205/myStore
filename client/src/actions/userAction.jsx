import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL, CLEAR_ERRORS } from "../constants/userConstants";
import axios from "axios";
const backend = "http://localhost:5000";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const {data} = await axios.post(
            `${backend}/api/v1/login`,
            {
                email,
                password,
                config
            },
            { withCredentials: true }
        );
        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message })
    }
}

export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST });
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.post(
            `${backend}/api/v1/register`,
            {
                userData,
                config
            },
            { withCredentials: true }
        );
        dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message })
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });
        const { data } = await axios.get(`${backend}/api/v1/profile`, { withCredentials: true });
        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
}