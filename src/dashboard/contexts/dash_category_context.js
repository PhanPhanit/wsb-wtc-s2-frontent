import React, {useReducer, useContext, createContext} from 'react';
import reducer from '../reducers/dash_category_reducer';
import { categoryUrl } from '../../UrlEndPoint';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
    SET_CATEGORY,
    CREATE_CATEGORY,
    DELETE_CATEGORY,
    SET_UPDATE_CATEGORY_ID,
    UPDATE_CATEGORY
} from '../action';


const initialState = {
    categories: [],
    updateCategoryId: "",
};

const DashCategoryContext = createContext();
const DashCategoryContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchCategory = async () => {
        const url = `${categoryUrl}/all?sort=-createdAt`;
        try {
            const {data: {category}} = await axios.get(url);
            dispatch({type: SET_CATEGORY, payload: category});
        } catch (error) {
            console.log(error);
        }
    }

    const createCategory = async (data) => {
        const {data: {category}} = await axios.post(categoryUrl, data);
        dispatch({type: CREATE_CATEGORY, payload: category});
    }

    const deleteCategory = async (categoryId) => {
        try {
            await axios.delete(`${categoryUrl}/${categoryId}`);
            dispatch({type: DELETE_CATEGORY, payload: categoryId});
            toast.success("Category had been removed.");
        } catch (error) {
            console.log(error);
        }
    }

    const setUpdateCategoryId = (categoryId) => {
        dispatch({type: SET_UPDATE_CATEGORY_ID, payload: categoryId});
    }

    const updateCategory = async (data, categoryId) => {
        const {data: {category}} = await axios.patch(`${categoryUrl}/${categoryId}`, data);
        dispatch({type: UPDATE_CATEGORY, payload: {category, categoryId}});
    }

    return <DashCategoryContext.Provider value={{ 
        ...state,
        fetchCategory,
        createCategory,
        deleteCategory,
        setUpdateCategoryId,
        updateCategory
     }}>{children}</DashCategoryContext.Provider>
}
const useDashCategoryContext = () => {
    return useContext(DashCategoryContext);
}

export {
    DashCategoryContextProvider,
    useDashCategoryContext
}