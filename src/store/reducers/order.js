import * as actionTypes from '../actions/actionTypes';

const initialState = {
    order: [],
    loading: false,
    purchase: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId
            };
            return {
                ...state,
                loading: false,
                purchased: true,
                order: state.orders.concat(newOrder)
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                loading: false
            };
        case actionTypes.PURCHASE_BURGER_START:
            return {
                loading: true
            };
        case actionTypes.PURCHASE_INIT:
            return {
                purchase: false
            };
        default:
            return state;
    }
};

export default reducer;
