import React, {useContext, useReducer, useEffect} from 'react';
import reducer from '../reducers/category_reducer';
import axios from 'axios';
import {
    getAllCategory as getAllCategoryUrl
} from '../UrlEndPoint';
import {
    FETCH_CATEGORY,
    CATEGORY_LOADING,
    CATEGORY_COMPLETE_LOADING,
    CATEGORY_EXIST,
    SET_CATEGORY_ID
} from '../action';

const initailState = {
    category_loading: false,
    category: [],
    category_exist: true,
    category_id: ""
}

const CategoyContext = React.createContext();
const CategoryProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initailState);

    const fetchCategory = async () => {
        dispatch({type: CATEGORY_LOADING});
        try {
            const {data:{category}} = await axios.get(getAllCategoryUrl);
            dispatch({type: FETCH_CATEGORY, payload: category});
        } catch (error) {
            console.log(error);
        }
        dispatch({type: CATEGORY_COMPLETE_LOADING});
    }

    const setCategoryExist = (value) => {
        dispatch({type: CATEGORY_EXIST, payload: value});
    }

    const setCategoryId = (id) => {
        dispatch({type: SET_CATEGORY_ID, payload: id});
    }

    return <CategoyContext.Provider value={{
        ...state,
        setCategoryExist,
        setCategoryId,
        fetchCategory
    }}>{children}</CategoyContext.Provider>
}

const useCategoryContext = () => {
    return useContext(CategoyContext);
}

export {
    CategoryProvider,
    useCategoryContext
}