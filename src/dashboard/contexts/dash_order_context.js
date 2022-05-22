import React,  {createContext, useContext, useReducer} from "react";
import reducer from '../reducers/dash_order_reducer';
import axios from "axios";
import {
    SET_ORDER,
    SET_VIEW_ORDER_ID,
    COMFIRM_ORDER
} from "../action";
import {productUrl} from '../../UrlEndPoint';


const initialState = {
    orders: [],
    totalPage: 0,
    currentPage: 0,
    viewOrderId: ""
};

const DashOrderContext = createContext();
const DashOrderContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    


    const fetchOrder = async (url) => {
        const {data: {order, currentPage, totalPage}} = await axios.get(url);
        dispatch({type: SET_ORDER, payload: {order, currentPage, totalPage}});
    }

    const setViewOrderId = (orderId) => {
        dispatch({type: SET_VIEW_ORDER_ID, payload: orderId});
    }


    const comfirmOrder = async (url, data) => {
        const {data: {order}} = await axios.patch(url, {status: "success"});
        const {orderItem} = order;
        for(const item of orderItem){
            const {product: productId, quantity} = item;
            const {data: {product}} = await axios.get(`${productUrl}/${productId}`);
            const {sold} = product;
            const updateSold = sold + quantity;
            await axios.patch(`${productUrl}/${productId}`, {sold: updateSold});
        }
        dispatch({type: COMFIRM_ORDER, payload: order});
    }


    return <DashOrderContext.Provider value={{ 
        ...state,
        fetchOrder,
        setViewOrderId,
        comfirmOrder
     }}>{children}</DashOrderContext.Provider>
}
const useDashOrderContext = () => {
    return useContext(DashOrderContext);
}

export {
    DashOrderContextProvider,
    useDashOrderContext
}