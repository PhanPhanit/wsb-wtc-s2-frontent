import React, {useReducer, useContext, createContext} from 'react';
import reducer from '../reducers/dash_slide_reducer';
import { slideUrl } from '../../UrlEndPoint';
import axios from 'axios';
import { toast } from 'react-toastify';
import { 
    SET_SLIDE,
    CREATE_SLIDE,
    DELETE_SLIDE,
    SET_UPDATE_SLIDE_ID,
    UPDATE_SLIDE
} from '../action';


const initialState = {
    slides: [],
    updateSlideId: "",
};


const DashSlideContext = createContext();
const DashSlideContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchSlide = async () => {
        const url = `${slideUrl}/admin?sort=-createdAt&limit=1000`;
        try {
            const {data: {slide}} = await axios.get(url);
            dispatch({type: SET_SLIDE, payload: slide});
        } catch (error) {
            console.log(error);
        }
    }

    const createSlide = async (data) => {
        const {data: {slide}} = await axios.post(slideUrl, data);
        dispatch({type: CREATE_SLIDE, payload: slide});
    }

    const deleteSlide = async (slideId) => {
        try {
            await axios.delete(`${slideUrl}/${slideId}`);
            dispatch({type: DELETE_SLIDE, payload: slideId});
            toast.success("Category had been removed.");
        } catch (error) {
            console.log(error);
        }
    }

    const setUpdateSlideId = (slideId) => {
        dispatch({type: SET_UPDATE_SLIDE_ID, payload: slideId});
    }

    const updateSlide = async (data, slideId) => {
        const {data: {slide}} = await axios.patch(`${slideUrl}/${slideId}`, data);
        dispatch({type: UPDATE_SLIDE, payload: {slide, slideId}});
    }


    return <DashSlideContext.Provider value={{ 
        ...state,
        fetchSlide,
        createSlide,
        deleteSlide,
        setUpdateSlideId,
        updateSlide
     }}>{children}</DashSlideContext.Provider>
}
const useDashSlideContext = () => {
    return useContext(DashSlideContext);
}

export {
    DashSlideContextProvider,
    useDashSlideContext
}