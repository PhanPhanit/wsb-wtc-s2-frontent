import React, { useContext, useReducer } from "react";
import reducer from '../reducers/action_reducer';
import {
    OPEN_SIDEBAR,
    CLOSE_SIDEBAR,
    ACCOUNT_SETTING_CLICK,
    HISTORY_CLICK,
    OPEN_FEEDBACK,
    CLOSE_FEEDBACK
} from '../action';

const initialState = {
    isOpenSidebar: false,
    isAccountOpen: true,
    isHistoryOpen: false,
    isFeedbackOpen: false
};
const ActionContext = React.createContext();
export const ActionProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const openSidebar = () => {
        dispatch({type: OPEN_SIDEBAR})
    }
    const closSidebar = () => {
        dispatch({type: CLOSE_SIDEBAR});
    }
    const accountSettingClick = () => {
        dispatch({type: ACCOUNT_SETTING_CLICK});
    }
    const historyClick = () => {
        dispatch({type: HISTORY_CLICK})
    }
    const openFeedback = () => {
        dispatch({type: OPEN_FEEDBACK});
    }
    const closeFeedback = () => {
        dispatch({type: CLOSE_FEEDBACK})
    }
    return (
        <ActionContext.Provider value={{
            ...state,
            openSidebar,
            closSidebar,
            accountSettingClick,
            historyClick,
            openFeedback,
            closeFeedback
        }}>{children}</ActionContext.Provider>
    );
}
export const useActionContext = () => {
    return useContext(ActionContext);
}