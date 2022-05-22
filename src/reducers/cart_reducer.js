import {
    CART_LOADING,
    SET_CART_ITEM,
    COUNT_CART_TOTALS,
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    CLEAR_CART,
    TOGGLE_CART_ITEM_AMOUNT
} from '../action';

const cart_reducer = (state, action) => {
    if(action.type===CART_LOADING){
        return {
            ...state,
            cart_loading: action.payload
        }
    }
    if(action.type===SET_CART_ITEM){
        return {
            ...state,
            cart: action.payload
        }
    }
    if(action.type===COUNT_CART_TOTALS){
        let {total_items, subtotal} = state.cart.reduce((total, item)=>{
            const {quantity, product: {price, discount}} = item;
            total.total_items += quantity;
            total.subtotal += (price - discount) * quantity;
            return total;
        }, {total_items: 0, subtotal: 0});
        subtotal = parseFloat(subtotal.toFixed(2));
        return {
            ...state,
            total_items,
            subtotal
        }
    }
    if(action.type===ADD_TO_CART){
        const {_id: cartId} = action.payload;
        const tempItem = state.cart.find((item)=>item._id === cartId);
        if(tempItem){
            const tempCart = state.cart.map((item)=>{
                if(item._id === cartId){
                    return {...item, quantity: item.quantity + 1}
                }
                return item;
            })
            return {
                ...state,
                cart: tempCart
            }
        }else{
            return {
                ...state,
                cart: [...state.cart, action.payload]
            }
        }
    }
    if(action.type===REMOVE_CART_ITEM){
        const newItem = state.cart.filter((item)=>item._id !== action.payload);
        return {
            ...state,
            cart: newItem
        }
    }
    if(action.type===CLEAR_CART){
        return {
            ...state,
            cart: []
        }
    }
    if(action.type===TOGGLE_CART_ITEM_AMOUNT){
        const {id, value} = action.payload;
        const tempCart = state.cart.map((item)=>{
            if(item._id===id){
                if(value==="increase"){
                    let newAmount = item.quantity + 1;
                    return {...item, quantity: newAmount};
                }
                if(value==="decrease"){
                    let newAmount = item.quantity - 1;
                    if(newAmount < 1){
                        newAmount = 1;
                    }
                    return {...item, quantity: newAmount};
                }
            }
            return item;
        });
        return {
            ...state,
            cart: tempCart
        }
    }
    throw new Error(`No Matchiing "${action.type}" - action type`);
}

export default cart_reducer;