import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  Navbar,
  Sidebar
} from '../components';
import LoadFormCreate from '../forms/LoadFormCreate';
import LoadFormUpdate from '../forms/LoadFormUpdate';
import '../styles/dashboardLayout.css';
import { useActionContext } from '../contexts/action_context';

const DashboardLayout = () => {
  const {showFormCreate, showFormUpdate} = useActionContext();
  return (
    <div className="dashboard-wrapper">
      {/* form */}
      {showFormCreate && <LoadFormCreate />}
      {showFormUpdate && <LoadFormUpdate />}
      {/* navbar */}
      <Navbar />
      <div className="wrapper-nav-body">
        {/* sidebar */}
        <Sidebar/>
        <div className="dahboard-page">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout