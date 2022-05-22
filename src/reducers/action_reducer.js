import {
    OPEN_SIDEBAR,
    CLOSE_SIDEBAR,
    HISTORY_CLICK,
    ACCOUNT_SETTING_CLICK,
    OPEN_FEEDBACK,
    CLOSE_FEEDBACK
} from '../action';
const cart_reducer = (state, action) => {
    if(action.type===OPEN_SIDEBAR){
        return {...state, isOpenSidebar: true};
    }
    if(action.type===CLOSE_SIDEBAR){
        return {...state, isOpenSidebar: false};
    }
    if(action.type===HISTORY_CLICK){
        return {...state, isHistoryOpen: true, isAccountOpen: false}
    }
    if(action.type===ACCOUNT_SETTING_CLICK){
        return {...state, isHistoryOpen: false, isAccountOpen: true}
    }
    if(action.type===OPEN_FEEDBACK){
        return {...state, isFeedbackOpen: true};
    }
    if(action.type===CLOSE_FEEDBACK){
        return {...state, isFeedbackOpen: false};
    }
    throw new Error(`No Matching "${action.type}" - action type`);
}
export default cart_reducer;