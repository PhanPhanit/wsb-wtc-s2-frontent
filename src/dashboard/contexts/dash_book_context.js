import React, {useContext, createContext, useReducer} from "react";
import axios from "axios";
import reducer from '../reducers/dash_book_reducer';
import { toast } from "react-toastify";
import { productUrl } from "../../UrlEndPoint";
import {
    SET_CATEGORY,
    SET_PRODUCT,
    CREATE_PRODUCT,
    SET_UPDATE_PRODUCT_ID,
    UPDATE_PRODUCT,
    DELETE_PRODUCT
} from "../action";

const initialState = {
    products: [],
    totalPage: 0,
    currentPage: 0,
    categories: [],
    updateProductId: ""
};
const DashBookContext = createContext();
const DashBookContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);


    const createProduct = async (url, data) => {
        const {data: {product}} = await axios.post(url, data);
        dispatch({type: CREATE_PRODUCT, payload: product});
    }

    const fechProduct = async (url) => {
        const {data: {product, currentPage, totalPage}} = await axios.get(url);
        dispatch({type: SET_PRODUCT, payload: {product, currentPage, totalPage}});
    }

    const fetchCategory = async (url) => {
        const {data: {category}} = await axios.get(url);
        dispatch({type: SET_CATEGORY, payload: category});
    }
    const setUpdateProductId = (productId) => {
        dispatch({type: SET_UPDATE_PRODUCT_ID, payload: productId});
    }
    const updateProduct = async (url, data) => {
        const {data: {product}} = await axios.patch(url, data);
        dispatch({type: UPDATE_PRODUCT, payload: product});
    }
    const deleteProduct = async (productId) => {
        try {
            await axios.delete(`${productUrl}/${productId}`);
            dispatch({type: DELETE_PRODUCT, payload: productId});
            toast.success("Book had been removed.");
        } catch (error) {
            console.log(error);
        }
    }

    return <DashBookContext.Provider value={{ 
        ...state,
        fechProduct,
        fetchCategory,
        createProduct,
        setUpdateProductId,
        updateProduct,
        deleteProduct
     }}>{children}</DashBookContext.Provider>
}
const useDashBookContext = () => {
    return useContext(DashBookContext);
}

export {
    DashBookContextProvider,
    useDashBookContext
}