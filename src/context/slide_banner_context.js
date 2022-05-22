import React, {useContext, useReducer, useEffect} from 'react';
import axios from 'axios';
import reducer from '../reducers/slide_banner_reducer';
import {
    getAllSlide as getAllSlideUrl
} from '../UrlEndPoint';

import {
    SET_SLIDE_BANNER_LOADING,
    SET_SLIDE_BANNER,
    SET_SLIDE_BANNER_ERROR
} from '../action';


const initailState = {
    slide_banner: [],
    slide_banner_loading: false,
    slide_banner_error: false
}

const SlideBannerContext = React.createContext();
const SlideBannerProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initailState);

    const fetchSlideBanner = async (url) => {
        dispatch({type: SET_SLIDE_BANNER_LOADING, payload: true});
        try {
            const {data: {slide}} = await axios.get(url);
            dispatch({type: SET_SLIDE_BANNER, payload: slide});
            dispatch({type: SET_SLIDE_BANNER_ERROR, payload: false});
        } catch (error) {
            dispatch({type: SET_SLIDE_BANNER_ERROR, payload: true});
        }
        dispatch({type: SET_SLIDE_BANNER_LOADING, payload: false});
    }

    useEffect(()=>{
        const url = `${getAllSlideUrl}?limit=5&sort=-createdAt`;
        fetchSlideBanner(url)
    }, []);

    return <SlideBannerContext.Provider value={{
        ...state
    }}>{children}</SlideBannerContext.Provider>
}

const useSlideBanner = () => {
    return useContext(SlideBannerContext);
}

export {
    SlideBannerProvider,
    useSlideBanner
}