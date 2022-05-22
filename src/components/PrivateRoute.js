import React from 'react'
import {Route, Navigate, Outlet} from 'react-router-dom';
import {useUserContext} from '../context/user_context';

const PrivateRoute = ({children}) => {
    const {myUser} = useUserContext();
    return myUser ? children:(
        <section className="page-full-screen">
            <Navigate to="/" />
        </section>
    )
}

export default PrivateRoute;