import {
    SET_PRODUCT,
    SET_CATEGORY,
    CREATE_PRODUCT,
    SET_UPDATE_PRODUCT_ID,
    UPDATE_PRODUCT,
    DELETE_PRODUCT
} from "../action";
const dash_book_reducer = (state, action) => {
    if(action.type===SET_PRODUCT){
        const {product, totalPage, currentPage} = action.payload;
        return {
            ...state,
            products: product,
            totalPage,
            currentPage
        }
    }
    if(action.type===SET_CATEGORY){
        return {
            ...state,
            categories: action.payload
        };
    }
    if(action.type===CREATE_PRODUCT){
        return {
            ...state,
            products: [action.payload, ...state.products]
        }
    }
    if(action.type===SET_UPDATE_PRODUCT_ID){
        return {
            ...state,
            updateProductId: action.payload
        }
    }
    if(action.type===UPDATE_PRODUCT){
        const product = action.payload;
        const {_id: productId} = product;
        const tempProduct = state.products.map((item)=>{
            if(item._id === productId){
                return product;
            }
            return item;
        });

        return {
            ...state,
            products: tempProduct
        }
    }
    if(action.type===DELETE_PRODUCT){
        const productId = action.payload;
        const tempProduct = state.products.filter(item=>item._id!==productId);
        return {
            ...state,
            products: tempProduct
        }
    }
    throw new Error(`No Matching "${action.type}" - action type`);
}

export default dash_book_reducer;