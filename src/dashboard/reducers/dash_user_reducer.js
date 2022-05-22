import {
    SET_USER,
    CREATE_USER,
    SET_UPDATE_USER_ID,
    UPDATE_USER,
    DELETE_USER
} from "../action";

const dash_user_reducer = (state, action) => {
    if(action.type===SET_USER){
        const {user, totalPage, currentPage} = action.payload;
        return {
            ...state,
            users: user,
            totalPage,
            currentPage
        }
    }
    if(action.type===CREATE_USER){
        return {
            ...state,
            users: [action.payload, ...state.users]
        }
    }
    if(action.type===SET_UPDATE_USER_ID){
        return {
            ...state,
            updateUserId: action.payload
        }
    }
    if(action.type===UPDATE_USER){
        const user = action.payload;
        const {_id: userId} = user;
        const tempUser = state.users.map((item)=>{
            if(item._id === userId){
                return user;
            }
            return item;
        });

        return {
            ...state,
            users: tempUser
        }
    }
    if(action.type===DELETE_USER){
        const userId = action.payload;
        const tempUser = state.users.filter(item=>item._id!==userId);
        return {
            ...state,
            users: tempUser
        }
    }
    throw new Error(`No Matching "${action.type}" - action type`);
}

export default dash_user_reducer;