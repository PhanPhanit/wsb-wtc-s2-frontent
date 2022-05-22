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
const product_reducer = (state, action) => {
    if(action.type===NEW_ARRIVAL_SET_ERROR){
        return {...state, new_arrival: {...state.new_arrival, error: action.payload}}
    }
    if(action.type===NEW_ARRIVAL_SET_LOADING){
        return {...state, new_arrival: {...state.new_arrival, loading: action.payload}};
    }
    if(action.type===NEW_ARRIVAL_SET_PRODUCT){
        return {...state, new_arrival: {...state.new_arrival, product_new_arrival: action.payload}};
    }
    if(action.type===SET_ERROR_ALL_FAVOR_BOOK){
        return {...state, all_favorit_book: {...state.all_favorit_book, error: action.payload}};
    }
    if(action.type===SET_LOADING_ALL_FAVOR_BOOK){
        return {...state, all_favorit_book: {...state.all_favorit_book, loading: action.payload}};
    }
    if(action.type===SET_PRODUCT_ALL_FAVOR_BOOK){
        const {totalPage, product} = action.payload;
        return {
            ...state,
            all_favorit_book: {
                ...state.all_favorit_book,
                product_favorit: product,
                total_page: totalPage
            }
        };
    }
    if(action.type===SET_NEW_ARRIVAL_PAGE){
        return {
            ...state,
            all_favorit_book: {
                ...state.all_favorit_book,
                current_page: action.payload
            }
        }
    }
    if(action.type===SET_SINGLE_PRODUCT_LOADING){
        return {
            ...state,
            single_product: {
                ...state.single_product,
                loading: action.payload
            }
        }
    }
    if(action.type===SET_SINGLE_PRODUCT_ERROR){
        return {
            ...state,
            single_product: {
                ...state.single_product,
                error: action.payload
            }
        }
    }
    if(action.type===SET_SINGLE_PRODUCT){
        return {
            ...state,
            single_product: {
                ...state.single_product,
                product: action.payload
            }
        }
    }
    if(action.type === SET_LOADING_SUGGESTION_PRODUCT){
        return {
            ...state,
            suggestion_product: {
                ...state.suggestion_product,
                loading: action.payload
            }
        }
    }
    if(action.type === SET_SUGGESTION_PRODUCT_ERROR){
        return {
            ...state,
            suggestion_product: {
                ...state.suggestion_product,
                error: action.payload
            }
        }
    }
    if(action.type === SET_SUGGESTION_PRODUCT){
        return {
            ...state,
            suggestion_product: {
                ...state.suggestion_product,
                product: action.payload
            }
        }
    }
    if(action.type === SET_LOADING_PEOPLE_LOOKING_PRODUCT){
        return {
            ...state,
            people_looking_product: {
                ...state.people_looking_product,
                loading: action.payload
            }
        }
    }
    if(action.type === SET_PEOPLE_LOOKING_PRODUCT_ERROR){
        return {
            ...state,
            people_looking_product: {
                ...state.people_looking_product,
                error: action.payload
            }
        }
    }
    if(action.type === SET_PEOPLE_LOOKING_PRODUCT){
        return {
            ...state,
            people_looking_product: {
                ...state.people_looking_product,
                product: action.payload
            }
        }
    }
    throw new Error(`No Matching "${action.type}" - action type`);
}

export default product_reducer;