import React, {createContext, useReducer, useContext} from 'react';
import reducer from '../reducers/dash_user_reducer';
import axios from 'axios';
import {
    SET_USER,
    CREATE_USER,
    SET_UPDATE_USER_ID,
    UPDATE_USER,
    DELETE_USER
} from '../action';
import { userUrl } from '../../UrlEndPoint';
import { toast } from 'react-toastify';

const initialState = {
    users: [],
    totalPage: 0,
    currentPage: 0,
    updateUserId: ""
};

const DashUserContext = createContext();
const DashUserContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fechUser = async (url) => {
        const {data: {user, currentPage, totalPage}} = await axios.get(url);
        dispatch({type: SET_USER, payload: {user, currentPage, totalPage}});
    }

    const createUser = async (url, data) => {
        const {data: {user}} = await axios.post(url, data);
        dispatch({type: CREATE_USER, payload: user});
    }
    const setUpdateUserId = (userId) => {
        dispatch({type: SET_UPDATE_USER_ID, payload: userId});
    }
    const updateUser = async (url, data) => {
        const {data: {user}} = await axios.patch(url, data);
        dispatch({type: UPDATE_USER, payload: user});
    }
    const deleteUser = async (userId) => {
        try {
            await axios.delete(`${userUrl}/${userId}`);
            dispatch({type: DELETE_USER, payload: userId});
            toast.success("User had been removed.");
        } catch (error) {
            console.log(error);
        }
    }

    return <DashUserContext.Provider value={{ 
        ...state,
        fechUser,
        createUser,
        setUpdateUserId,
        updateUser,
        deleteUser
     }}>{children}</DashUserContext.Provider>
}
const useDashUserContext = () => {
    return useContext(DashUserContext);
}
export {
    DashUserContextProvider,
    useDashUserContext
}