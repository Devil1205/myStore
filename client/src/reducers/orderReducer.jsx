import { CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CREATE_ORDER_FAIL, CLEAR_ERRORS, CREATE_ORDER_RESET, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, MY_ORDERS_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL, ALL_ORDERS_REQUEST, ALL_ORDERS_SUCCESS, ALL_ORDERS_FAIL, ADMIN_ORDER_DETAILS_REQUEST, ADMIN_ORDER_DETAILS_SUCCESS, ADMIN_ORDER_DETAILS_FAIL, UPDATE_ORDER_REQUEST, UPDATE_ORDER_SUCCESS, UPDATE_ORDER_FAIL, UPDATE_ORDER_RESET, DELETE_ORDER_REQUEST, DELETE_ORDER_FAIL, DELETE_ORDER_SUCCESS, DELETE_ORDER_RESET } from "../constants/orderConstants";

export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                }
            }
        case CREATE_ORDER_SUCCESS:
            {
                return {
                    loading: false,
                    order: action.payload
                }
            }
        case CREATE_ORDER_FAIL:
            {
                return {
                    loading: false,
                    error: action.payload
                }
            }
        case CLEAR_ERRORS:
            {
                return {
                    ...state,
                    error: null
                }
            }
        case CREATE_ORDER_RESET:
            {
                return {
                    ...state,
                    order: undefined
                }
            }
        default:
            return state;
    }
}

export const updateOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_ORDER_REQUEST:
        case DELETE_ORDER_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                }
            }
        case UPDATE_ORDER_SUCCESS:
            {
                return {
                    loading: false,
                    isUpdated: action.payload
                }
            }
        case DELETE_ORDER_SUCCESS:
            {
                return {
                    loading: false,
                    isDeleted: action.payload
                }
            }
        case UPDATE_ORDER_FAIL:
        case DELETE_ORDER_FAIL:
            {
                return {
                    loading: false,
                    error: action.payload
                }
            }
        case UPDATE_ORDER_RESET:
            {
                return {
                    ...state,
                    loading: null,
                    isUpdated: null
                }
            }
        case DELETE_ORDER_RESET:
            {
                return {
                    ...state,
                    loading: null,
                    isDeleted: null
                }
            }
        case CLEAR_ERRORS:
            {
                return {
                    ...state,
                    error: null
                }
            }
        default:
            return state;
    }
}

export const myOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case MY_ORDERS_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                }
            }
        case MY_ORDERS_SUCCESS:
            {
                return {
                    loading: false,
                    orders: action.payload
                }
            }
        case MY_ORDERS_FAIL:
            {
                return {
                    loading: false,
                    error: action.payload
                }
            }
        case CLEAR_ERRORS:
            {
                return {
                    ...state,
                    error: null
                }
            }
        default:
            return state;
    }
}

export const allOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ALL_ORDERS_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                }
            }
        case ALL_ORDERS_SUCCESS:
            {
                return {
                    loading: false,
                    orders: action.payload
                }
            }
        case ALL_ORDERS_FAIL:
            {
                return {
                    loading: false,
                    error: action.payload
                }
            }
        case CLEAR_ERRORS:
            {
                return {
                    ...state,
                    error: null
                }
            }
        default:
            return state;
    }
}

export const orderDetailsReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
        case ADMIN_ORDER_DETAILS_REQUEST:
            {
                return {
                    ...state,
                    loading: true,
                }
            }
        case ORDER_DETAILS_SUCCESS:
        case ADMIN_ORDER_DETAILS_SUCCESS:
            {
                return {
                    loading: false,
                    order: action.payload
                }
            }
        case ORDER_DETAILS_FAIL:
        case ADMIN_ORDER_DETAILS_FAIL:
            {
                return {
                    loading: false,
                    error: action.payload
                }
            }
        case CLEAR_ERRORS:
            {
                return {
                    ...state,
                    error: null
                }
            }
        default:
            return state;
    }
}