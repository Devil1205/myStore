import { UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_FAIL, CLEAR_ERRORS, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL } from "../constants/profileContstants";
import axios from "axios";
const backend = "http://localhost:5000";

export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PROFILE_REQUEST });
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        await axios.put(
            `${backend}/api/v1/profile/update`,
            {
                ...userData,
                config
            },
            { withCredentials: true }
        );
        dispatch({ type: UPDATE_PROFILE_SUCCESS });
    } catch (error) {
        dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.response.data.message })
    }
}

export const updatePassword = (newPassword) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST });
        const config = { headers: { "Content-Type": "applicaton/json" } };
        await axios.put(
            `${backend}/api/v1/password/update`,
            {
                ...newPassword,
                config
            },
            { withCredentials: true }
        );
        dispatch({ type: UPDATE_PASSWORD_SUCCESS });
    } catch (error) {
        dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
}