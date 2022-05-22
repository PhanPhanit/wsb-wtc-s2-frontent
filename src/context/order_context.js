import React, {useContext, createContext, useReducer, useState} from 'react';
import reducer from '../reducers/order_reducer';
import axios from 'axios';
import {
    createOrder as createOrderUrl,
    getAllMyOrder as getAllMyOrderUrl
} from '../UrlEndPoint';

import {
    SET_PAYMENT_INTENT,
    SET_ORDER_LOADING,
    SET_ORDER,
    SET_ORDER_ITEM
} from '../action';

const initailState = {
    paymentIntent: "",
    order: [],
    orderItem: [],
    orderLoading: true,
    orderError: false,
};
const OrderContext = createContext();
const OrderProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initailState);
    const [paymentInfo, setPaymentInfo] = useState({
        phoneNumber: "",
        city: "0",
        address: ""
    });
    const handleSetPaymentInfo = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setPaymentInfo({...paymentInfo, [name]: value});
    }
    const setPaymentIntent = (paymentIntent) => {
        dispatch({type: SET_PAYMENT_INTENT, payload: paymentIntent});
    }
    const createOrder = async (order) => {
        try {
            const {data} = await axios.post(createOrderUrl, order);
            console.log(data);
        } catch (error) {
            if(error.response){
                const {msg} = error.response.data;
                console.log(msg);
            }
        }
    }

    const getAllMyOrder = async () => {
        dispatch({type: SET_ORDER_LOADING, payload: true});
        try {
            const {data: {order}} = await axios.get(getAllMyOrderUrl);
            dispatch({type: SET_ORDER, payload: order});
            dispatch({type: SET_ORDER_ITEM, payload: order});
        } catch (error) {
            if(error.response){
                const {msg} = error.response.data;
                console.log(msg);
            }
        }
        dispatch({type: SET_ORDER_LOADING, payload: false});
    }

    return <OrderContext.Provider value={{ 
        ...state,
        paymentInfo,
        handleSetPaymentInfo,
        setPaymentIntent,
        createOrder,
        getAllMyOrder
     }}>{children}</OrderContext.Provider>
}

const useOrderContext = () => {
    return useContext(OrderContext);
}

export {
    OrderProvider,
    useOrderContext
}