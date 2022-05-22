import React, {useContext, useReducer, useEffect, useState} from 'react';
import axios from 'axios';
import {useCategoryContext} from './category_context';
import reducer from '../reducers/product_reducer';
import {
    getAllProduct as getAllProductUrl
} from '../UrlEndPoint';

import {
    NEW_ARRIVAL_SET_LOADING,
    NEW_ARRIVAL_SET_ERROR,
    NEW_ARRIVAL_SET_PRODUCT,
    SET_LOADING_ALL_FAVOR_BOOK,
    SET_ERROR_ALL_FAVOR_BOOK,
    SET_PRODUCT_ALL_FAVOR_BOOK,
    SET_NEW_ARRIVAL_PAGE,
    SET_SINGLE_PRODUCT_LOADING,
    SET_SINGLE_PRODUCT_ERROR,
    SET_SINGLE_PRODUCT,
    SET_LOADING_SUGGESTION_PRODUCT,
    SET_SUGGESTION_PRODUCT,
    SET_SUGGESTION_PRODUCT_ERROR,
    SET_LOADING_PEOPLE_LOOKING_PRODUCT,
    SET_PEOPLE_LOOKING_PRODUCT,
    SET_PEOPLE_LOOKING_PRODUCT_ERROR
} from '../action';

const initailState = {
    new_arrival: {
        product_new_arrival: [],
        loading: false,
        error: false
    },
    all_favorit_book: {
        product_favorit: [],
        loading: false,
        error: false,
        total_page: 0,
        current_page: 1
    },
    single_product: {
        product: {},
        loading: true,
        error: false
    },
    suggestion_product: {
        product: [],
        loading: false,
        error: false
    },
    people_looking_product: {
        product: [],
        loading: false,
        error: false
    }
}


const ProductContext = React.createContext();
const ProductProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initailState);
    const {category_id} = useCategoryContext();
    const [searchQuery, setSearchQuery] = useState('');

    const fetchProductNewArrive = async () => {
        dispatch({type: NEW_ARRIVAL_SET_LOADING, payload: true})
        try {
            const {data:{product: new_arrival}} = await axios.get(`${getAllProductUrl}?limit=10&sort=-createdAt`);
            dispatch({type: NEW_ARRIVAL_SET_ERROR, payload: false});
            dispatch({type: NEW_ARRIVAL_SET_PRODUCT, payload: new_arrival});
        } catch (error) {
            dispatch({type: NEW_ARRIVAL_SET_ERROR, payload: true})
        }
        dispatch({type: NEW_ARRIVAL_SET_LOADING, payload: false})
    }

    const fetchProductAllFavorBook = async (url) => {
        dispatch({type: SET_LOADING_ALL_FAVOR_BOOK, payload: true})
        try {
            const {data} = await axios.get(url);
            dispatch({type: SET_ERROR_ALL_FAVOR_BOOK, payload: false})
            dispatch({type: SET_PRODUCT_ALL_FAVOR_BOOK, payload: data});
        } catch (error) {
            dispatch({type: SET_ERROR_ALL_FAVOR_BOOK, payload: true})
        }
        dispatch({type: SET_LOADING_ALL_FAVOR_BOOK, payload: false})
    }

    const fetchSingleProduct = async (url) => {
        dispatch({type: SET_SINGLE_PRODUCT_LOADING, payload: true})
        try {
            const {data: {product}} = await axios.get(url);
            dispatch({type: SET_SINGLE_PRODUCT, payload: product});
            dispatch({type: SET_SINGLE_PRODUCT_ERROR, payload: false});
            dispatch({type: SET_SINGLE_PRODUCT_LOADING, payload: false})
            // fetch suggestion product and people looking
            fetchSuggestionProduct(`${getAllProductUrl}?limit=15&category=${product.category}&sort=-sold`);
            // fetchPeopleLookingProduct(`${getAllProductUrl}?limit=15&category=${product.category}&sort=-views`);
            fetchPeopleLookingProduct(`${getAllProductUrl}?limit=15&sort=-views`);
            // increase view
            const productId = product._id;
            await axios.get(`${getAllProductUrl}/increase-view/${productId}`);
        } catch (error) {
            dispatch({type: SET_SINGLE_PRODUCT_ERROR, payload: true});
            dispatch({type: SET_SINGLE_PRODUCT_LOADING, payload: false})
        }
    }
    // Fetch suggestion product
    const fetchSuggestionProduct = async (url) => {
        dispatch({type: SET_LOADING_SUGGESTION_PRODUCT, payload: true})
        try {
            const {data:{product}} = await axios.get(url);
            dispatch({type: SET_SUGGESTION_PRODUCT, payload: product});
            dispatch({type: SET_SUGGESTION_PRODUCT_ERROR, payload: false})
        } catch (error) {
            dispatch({type: SET_SUGGESTION_PRODUCT_ERROR, payload: true})
        }
        dispatch({type: SET_LOADING_SUGGESTION_PRODUCT, payload: false})
    }
    // Fetch people looking product
    const fetchPeopleLookingProduct = async (url) => {
        dispatch({type: SET_LOADING_PEOPLE_LOOKING_PRODUCT, payload: true});
        try {
            const {data: {product}} = await axios.get(url);
            dispatch({type: SET_PEOPLE_LOOKING_PRODUCT, payload: product});
            dispatch({type: SET_PEOPLE_LOOKING_PRODUCT_ERROR, payload: false});
        } catch (error) {
            dispatch({type: SET_PEOPLE_LOOKING_PRODUCT_ERROR, payload: true});
        }
        dispatch({type: SET_LOADING_PEOPLE_LOOKING_PRODUCT, payload: false});
    }

    const setNewArrivalPage = (page) => {
        dispatch({type: SET_NEW_ARRIVAL_PAGE, payload: page});
    }

    useEffect(()=> {

        let url = "";
        if(category_id) {
            url = `${getAllProductUrl}?limit=20&page=${state.all_favorit_book.current_page}&category=${category_id}&sort=-createdAt`;
        }else {
            url = `${getAllProductUrl}?limit=20&page=${state.all_favorit_book.current_page}&sort=-createdAt`;
        }

        fetchProductAllFavorBook(url);
    }, [state.all_favorit_book.current_page, category_id]);

    useEffect(() => {
        fetchProductNewArrive();
    }, []);

    useEffect(()=>{
        setNewArrivalPage(1);
    }, [category_id])

    return <ProductContext.Provider value={{
        ...state,
        searchQuery,
        setSearchQuery,
        setNewArrivalPage,
        fetchSingleProduct,
        fetchSuggestionProduct,
        fetchPeopleLookingProduct
    }}>{children}</ProductContext.Provider>
}

const useProductContext = () => {
    return useContext(ProductContext);
}

export {
    ProductProvider,
    useProductContext
}