import React, {useReducer, createContext, useContext, useState} from 'react';
import {toast} from 'react-toastify';
import axiosPublic from '../axiosPublic';
import axiosPrivate from '../axiosPrivate';
import reducer from '../reducers/review_reducer';
import {
    review as reviewUrl,
    starPercent as starPercentUrl
} from '../UrlEndPoint';
import {
    SET_REVIEW,
    EMPTY_REVIEW_PAGE,
    PERCENT_STAR_LOADING,
    SET_PERCENT_STAR
} from '../action';


const initailState = {
    allReview: {
        totalPage: 0,
        reviews: []
    },
    starReview: {
        starPercent: [],
        starLoading: false
    }
};

const ReviewContext = createContext();
const ReviewProvider = ({children})=>{
    const [state, dispatch] = useReducer(reducer, initailState);
    const [review, setReivew] = useState({
        rating: 0,
        comment: "",
        product: ""
    });
    const [reviewLoading, setReviewLoading] = useState(false);
    const createReview = async () => {
        setReviewLoading(true);
        try {
            await axiosPrivate.post(reviewUrl, review);
            toast.success("Successful");
        } catch (error) {
            if(error.response){
                const {message} = error.response.data;
                toast.error(message)
            }
        }
        setReviewLoading(false);
    }

    const getAllReview = async (productId, page, rate) => {
        setReviewLoading(true);
        let url = "";
        if(rate==="all"){
            url = `${reviewUrl}?product=${productId}&limit=4&page=${page}&populate=user&sort=-created_at`;
        }else{
            url = `${reviewUrl}?product=${productId}&limit=4&page=${page}&populate=user&rating=${rate}&sort=-created_at`;
        }
        try {
            const {data} = await axiosPublic.get(url);
            dispatch({type: SET_REVIEW, payload: data});
        } catch (error) {
            if(error.response){
                const {message} = error.response.data;
                toast.error(message)
            }
        }
        setReviewLoading(false);
    }
    const emptyReviewPage = () => {
        dispatch({type: EMPTY_REVIEW_PAGE});
    }

    const checkReviewExist = async (productId, userId) => {
        try {
            const url = `${reviewUrl}?product=${productId}&user=${userId}`;
            const {data:{review}} = await axiosPublic.get(url);
            if(review.length>0){
                return {message: true, error: false};
            }
            return {message: false, error: false};
        } catch (error) {
            return {message: false, error: true};
        }
    }

    const fetchPercentStar = async (productId) => {
        dispatch({type: PERCENT_STAR_LOADING, payload: true});
        try {
            const {data: {percentStar}} = await axiosPublic.get(`${starPercentUrl}/${productId}`);
            dispatch({type: SET_PERCENT_STAR, payload: percentStar})
        } catch (error) {
            console.log(error);
        }
        dispatch({type: PERCENT_STAR_LOADING, payload: false});
    }

    return <ReviewContext.Provider value={{ 
        ...state,
        review,
        setReivew,
        createReview,
        reviewLoading,
        checkReviewExist,
        getAllReview,
        emptyReviewPage,
        fetchPercentStar
     }}>{children}</ReviewContext.Provider>
}
const useReviewContext = () => {
    return useContext(ReviewContext);
}

export {
    ReviewProvider,
    useReviewContext
}