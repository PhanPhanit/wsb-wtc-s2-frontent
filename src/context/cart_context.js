import React, {useEffect, useContext, useReducer} from 'react';
import reducer from '../reducers/cart_reducer';
import {useUserContext} from './user_context';
import axios from 'axios';
import {
    getAllOrderItem as getAllOrderItemUrl
} from '../UrlEndPoint';
import {
    CART_LOADING,
    SET_CART_ITEM,
    COUNT_CART_TOTALS,
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    CLEAR_CART,
    TOGGLE_CART_ITEM_AMOUNT
} from '../action';

const initialState = {
    cart: [],
    cart_loading: true,
    total_items: 0,
    subtotal: 0,
    shipping_fee: 2
}

const CartContext = React.createContext();

const CartProvider = ({children}) => {
    const {myUser} = useUserContext();
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchCartItem = async (url) => {
        dispatch({type: CART_LOADING, payload: true});
        try {
            const {data: {orderItem}} = await axios.get(url);
            dispatch({type: SET_CART_ITEM, payload: orderItem});
        } catch (error) {
            dispatch({type: SET_CART_ITEM, payload: []});
        }
        dispatch({type: CART_LOADING, payload: false});
    }

    const addToCart = async ({_id: productId, image}) => {
        dispatch({type: CART_LOADING, payload: true});
        try {
            const {data: {orderItem}} = await axios.post(getAllOrderItemUrl, {product: productId, image: image[0], quantity: 1});
            dispatch({type: ADD_TO_CART, payload: orderItem});
        } catch (error) {
            console.log(error);
        }
        dispatch({type: CART_LOADING, payload: false});
    }

    const removeItem = async (id) => {
        try {
            await axios.delete(`${getAllOrderItemUrl}/${id}`);
            dispatch({type: REMOVE_CART_ITEM, payload: id});
        } catch (error) {
            console.log(error);
        }
    }

    const clearCart = async () => {
        try {
            await axios.delete(getAllOrderItemUrl);
            dispatch({type: CLEAR_CART});
        } catch (error) {
            console.log(error);
        }
    }

    const toggleAmount = async (id, value, quantity) => {
        try {
            let newAmount;
            if(value==="increase"){
                newAmount = quantity + 1;
            }
            if(value==="decrease"){
                newAmount = quantity - 1;
                if(newAmount < 1){
                    newAmount = 1;
                    return;
                }
            }
            await axios.patch(`${getAllOrderItemUrl}/${id}`, {quantity: newAmount});
            dispatch({type: TOGGLE_CART_ITEM_AMOUNT, payload: {id, value}});
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        if(myUser){
            fetchCartItem(getAllOrderItemUrl);
        }
    }, [myUser]);

    useEffect(()=>{
        dispatch({type: COUNT_CART_TOTALS});
    }, [state.cart]);
    return <CartContext.Provider value={{
        ...state,
        addToCart,
        removeItem,
        clearCart,
        toggleAmount
    }}>{children}</CartContext.Provider>
}
const useCartContext = () => {
    return useContext(CartContext);
}

export {
    CartProvider,
    useCartContext,
}