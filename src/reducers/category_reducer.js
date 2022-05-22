import {
    FETCH_CATEGORY,
    CATEGORY_LOADING,
    CATEGORY_COMPLETE_LOADING,
    CATEGORY_EXIST,
    SET_CATEGORY_ID
} from '../action';

const category_reducer = (state, action) => {
    if(action.type===FETCH_CATEGORY){
        return {...state, category: action.payload};
    }
    if(action.type===CATEGORY_COMPLETE_LOADING){
        return {...state, category_loading: false};
    }
    if(action.type===CATEGORY_LOADING){
        return {...state, category_loading: true};
    }
    if(action.type===CATEGORY_EXIST){
        return {...state, category_exist: action.payload};
    }
    if(action.type===SET_CATEGORY_ID){
        return {...state, category_id: action.payload};
    }
    throw new Error(`No Matching "${action.type}" - action type`);
}

export default category_reducer;