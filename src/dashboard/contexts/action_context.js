import React, {useContext, createContext, useState} from 'react';



const ActionContext = createContext();
const ActionProvider = ({children}) => {
    const [isUserShow, setIsUserShow] = useState(false);
    const [dashboardTitle, setDashboardTitle] = useState("Dashboard");
    const [isSidebarShow, setIsSidebarShow] = useState(true);
    const [showFormCreate, setShowFormCreate] = useState(false);
    const [showFormUpdate, setShowFormUpdate] = useState(false);

    const openFormCreate = () => {
        setShowFormCreate(true);
    }
    const closeFormCreate = () => {
        setShowFormCreate(false);
    }
    const openFormUpdate = () => {
        setShowFormUpdate(true);
    }
    const closeFormUpdate = () => {
        setShowFormUpdate(false);
    }

    return <ActionContext.Provider value={{ 
        isUserShow,
        setIsUserShow,
        dashboardTitle,
        setDashboardTitle,
        isSidebarShow,
        setIsSidebarShow,
        openFormCreate,
        closeFormCreate,
        showFormCreate,
        showFormUpdate,
        openFormUpdate,
        closeFormUpdate
     }}>{children}</ActionContext.Provider>
}

const useActionContext = () => {
    return useContext(ActionContext);
}

export {
    ActionProvider,
    useActionContext
}