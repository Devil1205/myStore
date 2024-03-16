import axios from 'axios';
import {
    ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, CLEAR_ERRORS,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, CREATE_REVIEW_FAIL, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ADMIN_PRODUCT_FAIL, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAIL, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, UPDATE_PRODUCT_REQUEST, UPDATE_PRODUCT_SUCCESS, UPDATE_PRODUCT_FAIL, ALL_REVIEWS_REQUEST, ALL_REVIEWS_SUCCESS, ALL_REVIEWS_FAIL, DELETE_REVIEW_REQUEST, DELETE_REVIEW_SUCCESS, DELETE_REVIEW_FAIL,
} from '../constants/productContants';
const backend = "http://localhost:5000";

export const getProduct = (keyword = "", page = 1, limit = 8, price = [0, 100000], category = "", rating = 0) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });

        let link = `${backend}/api/v1/products?search=${keyword}&category=${category}&page=${page}&limit=${limit}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`;

        const { data } = await axios.get(link);
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response.data.message
        });
    }

}

export const getProductAdmin = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCT_REQUEST });

        const { data } = await axios.get(`${backend}/api/v1/admin/products`, { withCredentials: true });
        dispatch({
            type: ADMIN_PRODUCT_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
            payload: error.response.data.message
        });
    }

}

export const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_PRODUCT_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
            `${backend}/api/v1/admin/product`,
            {
                ...productData,
                config
            },
            { withCredentials: true }
        );
        dispatch({ type: CREATE_PRODUCT_SUCCESS, payload: data.success })
    } catch (error) {
        dispatch({ type: CREATE_PRODUCT_FAIL, payload: error.response.data.message })
    }
}

export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });
        const { data } = await axios.delete(`${backend}/api/v1/admin/product/${id}`, { withCredentials: true });
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data.success })
    } catch (error) {
        dispatch({ type: DELETE_PRODUCT_FAIL, payload: error.response.data.message })
    }
}

export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PRODUCT_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.put(
            `${backend}/api/v1/admin/product/${id}`,
            {
                ...productData,
                config
            },
            { withCredentials: true }
        );
        dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: data.success })
    } catch (error) {
        dispatch({ type: UPDATE_PRODUCT_FAIL, payload: error.response.data.message })
    }
}

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        const { data } = await axios.get(backend + "/api/v1/product/" + id);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response.data.message
        });
    }
}

export const createReview = (reviewData, product) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_REVIEW_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
            `${backend}/api/v1/product/${product}/review`,
            {
                ...reviewData,
                config
            },
            { withCredentials: true }
        );
        dispatch({ type: CREATE_REVIEW_SUCCESS, payload: data.success })
    } catch (error) {
        dispatch({ type: CREATE_REVIEW_FAIL, payload: error.response.data.message })
    }
}

export const allReviews = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_REVIEWS_REQUEST });

        const { data } = await axios.get(backend + "/api/v1/admin/reviews", { withCredentials: true }   );
        dispatch({
            type: ALL_REVIEWS_SUCCESS,
            payload: data.reviews
        })
    } catch (error) {
        dispatch({
            type: ALL_REVIEWS_FAIL,
            payload: error.response.data.message
        });
    }
}

export const deleteReview = (product, review) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_REVIEW_REQUEST });

        const { data } = await axios.delete(
            `${backend}/api/v1/admin/product/${product}/review/${review}`,
            { withCredentials: true }
        );
        dispatch({
            type: DELETE_REVIEW_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data.message
        });
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    });
}