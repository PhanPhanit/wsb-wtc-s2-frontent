import React from 'react';
import {FormCreate} from './create/FormCreate';
import { useActionContext } from '../contexts/action_context';

const LoadFormCreate = () => {
  const {dashboardTitle} = useActionContext();
  return (
    <div className="frm-black-background">
      {FormCreate[dashboardTitle]}
    </div>
  )
}

export default LoadFormCreate