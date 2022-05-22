import {
    SET_ORDER,
    SET_VIEW_ORDER_ID,
    COMFIRM_ORDER
} from "../action";

const dash_order_reducer = (state, action) => {
    if(action.type===SET_ORDER){
        const {order, totalPage, currentPage} = action.payload;
        return {
            ...state,
            orders: order,
            totalPage,
            currentPage
        }
    }
    if(action.type===SET_VIEW_ORDER_ID){
        return {
            ...state,
            viewOrderId: action.payload
        }
    }
    if(action.type===COMFIRM_ORDER){
        const updateOrder = action.payload;
        const {_id: orderId} = updateOrder;
        const tempOrders = state.orders.map(item=>{
            if(item._id === orderId){
                return updateOrder;
            }
            return item;
        });
        return {
            ...state,
            orders: tempOrders
        }
    }
    throw new Error(`No Matching "${action.type}" - action type`);
}
export default dash_order_reducer;