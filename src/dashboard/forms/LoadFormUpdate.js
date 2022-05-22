import React from 'react';
import { FormUpdate } from './update/FormUpdate';
import { useActionContext } from '../contexts/action_context';

const LoadFormUpdate = () => {
  const {dashboardTitle} = useActionContext();
  return (
    <div className="frm-black-background">
      {FormUpdate[dashboardTitle]}
    </div>
  )
}

export default LoadFormUpdate