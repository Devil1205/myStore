import {
    ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, ALL_PRODUCT_FAIL, CLEAR_ERRORS,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL, CREATE_REVIEW_REQUEST, CREATE_REVIEW_SUCCESS, CREATE_REVIEW_FAIL, CREATE_REVIEW_RESET, ADMIN_PRODUCT_REQUEST, ADMIN_PRODUCT_SUCCESS, ADMIN_PRODUCT_FAIL, CREATE_PRODUCT_REQUEST, CREATE_PRODUCT_SUCCESS, CREATE_PRODUCT_FAIL, CREATE_PRODUCT_RESET, DELETE_PRODUCT_REQUEST, DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_RESET,
} from '../constants/productContants';

export const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCT_REQUEST:
        case ADMIN_PRODUCT_REQUEST:
            return {
                loading: true,
                products: []
            }
        case ALL_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.product,
                productCount: action.payload.totalProductCount,
                filteredProductCount: action.payload.filteredProductCount
            }
        case ADMIN_PRODUCT_SUCCESS:
            return {
                loading: false,
                products: action.payload.product
            }
        case ALL_PRODUCT_FAIL:
        case ADMIN_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const newProductReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_PRODUCT_REQUEST:
            return {
                loading: true,
                ...state
            }
        case CREATE_PRODUCT_SUCCESS:
            return {
                loading: false,
                success: action.payload,
            }
        case CREATE_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CREATE_PRODUCT_RESET:
            return {
                ...state,
                loading: null,
                success: null
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const deleteProductReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_PRODUCT_REQUEST:
            return {
                loading: true,
                ...state
            }
        case DELETE_PRODUCT_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload,
            }
        case DELETE_PRODUCT_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case DELETE_PRODUCT_RESET:
            return {
                ...state,
                loading: null,
                isDeleted: null
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload.product,
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_REVIEW_REQUEST:
            return {
                loading: true,
                ...state
            }
        case CREATE_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload,
            }
        case CREATE_REVIEW_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CREATE_REVIEW_RESET:
            return {
                ...state,
                success: null
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}