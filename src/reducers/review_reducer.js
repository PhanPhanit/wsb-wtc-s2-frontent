import {
    SET_REVIEW,
    EMPTY_REVIEW_PAGE,
    PERCENT_STAR_LOADING,
    SET_PERCENT_STAR
} from '../action';

const review_reducer = (state, action) => {
    if(action.type===SET_REVIEW){
        const {totalPage, review} = action.payload;
        return {
            ...state,
            allReview: {
                totalPage,
                reviews: [
                    ...state.allReview.reviews,
                    ...review
                ]
            }
        };
    }
    if(action.type===EMPTY_REVIEW_PAGE){
        return {
            ...state,
            allReview: {
                totalPage: 0,
                reviews: []
            }
        };
    }
    if(action.type===PERCENT_STAR_LOADING){
        return {
            ...state,
            starReview: {
                ...state.starReview,
                starLoading: action.payload
            }
        }
    }
    if(action.type===SET_PERCENT_STAR){

        const starPercent = action.payload;

        starPercent.sort((a, b)=>{
            return b.star - a.star;
        });

        return {
            ...state,
            starReview: {
                ...state.starReview,
                starPercent
            }
        };
    }
    throw new Error(`No matching "${action.type}" - action type`);
}

export default review_reducer;