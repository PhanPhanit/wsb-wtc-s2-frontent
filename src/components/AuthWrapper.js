import React from 'react'
import {useUserContext} from '../context/user_context';

const AuthWrapper = ({children}) => {
    const {loading} = useUserContext();
    if(loading){
        return (
            <div className="app-loading">
                <div className="app-lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }
    return (
        <>{children}</>
    )
}

export default AuthWrapper
