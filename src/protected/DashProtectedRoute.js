import React from 'react'
import {Navigate} from 'react-router-dom';
import { useUserContext } from '../context/user_context';

const DashProtectedRoute = ({children}) => {
  const {myUser} = useUserContext();
  if(!myUser || myUser?.role==='user'){
    return <Navigate to='/' />
  }
  return children;
}

export default DashProtectedRoute