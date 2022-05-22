import {
    SET_CATEGORY,
    CREATE_CATEGORY,
    DELETE_CATEGORY,
    SET_UPDATE_CATEGORY_ID,
    UPDATE_CATEGORY
} from "../action";

const dash_category_reducer = (state, action) => {
    if(action.type===SET_CATEGORY){
        return {
            ...state,
            categories: action.payload
        }
    }
    if(action.type===CREATE_CATEGORY){
        return {
            ...state,
            categories: [action.payload, ...state.categories]
        }
    }
    if(action.type===DELETE_CATEGORY){
        const categoryId = action.payload;
        const tempCategories = state.categories.filter(item=>item._id!==categoryId);
        return {
            ...state,
            categories: tempCategories
        }
    }
    if(action.type===SET_UPDATE_CATEGORY_ID){
        return {...state, updateCategoryId: action.payload};
    }
    if(action.type===UPDATE_CATEGORY){
        const {category, categoryId} = action.payload;
        const updateCategory = state.categories.map(item=>{
            if(item._id===categoryId){
                return category;
            }
            return item;
        });
        return {...state, categories: updateCategory};
    }
    throw new Error(`No Matching "${action.type}" - action type`);
}

export default dash_category_reducer;