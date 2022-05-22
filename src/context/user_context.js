import React, { useContext, useState, useEffect } from "react";
import axios from 'axios';
import {
    updateUser as updateUserUrl,
    updateUserPassword as updateUserPasswordUrl
} from "../UrlEndPoint";

const UserContext = React.createContext();
const UserProvider = ({children}) => {
    const [myUser, setMyUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const showMe = async () => {
        try {
            const {data} = await axios.get('/api/v1/users/showMe');
            saveUser(data.user);
        } catch (error) {
            removeUser();
        }
        setLoading(false);
    }
    useEffect(()=>{
        showMe();
    }, []);
    const saveUser = (user) => {
        setMyUser(user);
    }
    const removeUser = () => {
        setMyUser(null);
    }

    const updateUser = async (data) => {
        const {data: {user}} = await axios.patch(updateUserUrl, data);
        setMyUser(user);
    }

    const updatePasswordUser = async (data) => {
        await axios.patch(updateUserPasswordUrl, data);
    }

    return <UserContext.Provider value={{
        loading,
        setLoading,
        myUser,
        saveUser,
        removeUser,
        updateUser,
        updatePasswordUser
    }}>{children}</UserContext.Provider>
}

const useUserContext = () => {
    return useContext(UserContext);
}

export {
    UserProvider,
    useUserContext
}
