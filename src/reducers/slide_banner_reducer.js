import {
    SET_SLIDE_BANNER_LOADING,
    SET_SLIDE_BANNER,
    SET_SLIDE_BANNER_ERROR
} from '../action';
const slide_banner_reducer = (state, action) => {
    if(action.type === SET_SLIDE_BANNER_LOADING){
        return {
            ...state,
            slide_banner_loading: action.payload
        }
    }
    if(action.type === SET_SLIDE_BANNER){
        return {
            ...state,
            slide_banner: action.payload
        }
    }
    if(action.type === SET_SLIDE_BANNER_ERROR){
        return {
            ...state,
            slide_banner_error: action.payload
        }
    }
    throw new Error(`No matching "${action.type}" - action type`);
}

export default slide_banner_reducer;