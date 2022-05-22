import {
    SET_PAYMENT_INTENT,
    SET_ORDER_LOADING,
    SET_ORDER,
    SET_ORDER_ITEM
} from '../action';
const order_reducer = (state, action) => {
    if(action.type===SET_PAYMENT_INTENT){
        return {
            ...state,
            paymentIntent: action.payload
        }
    }
    if(action.type===SET_ORDER_LOADING){
        return {
            ...state,
            orderLoading: action.payload
        };
    }
    if(action.type===SET_ORDER){
        return {...state, order: action.payload};
    }
    if(action.type===SET_ORDER_ITEM){
        let orderItem = [];
        action.payload.forEach((item)=>{
            const {
                orderDate,
                status
            } = item;
            let tempOrderItem = item.orderItem.map((innerItem)=>{
                return {...innerItem, orderDate, status}
            });
            orderItem = [...orderItem, ...tempOrderItem];
        });
        return {...state, orderItem};
    }
    throw new Error(`No Matching "${action.type}" - action type`);
}

export default order_reducer;