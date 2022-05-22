import React from 'react';
import {NavLink, useLocation} from 'react-router-dom';
import {SidebarData} from './../utils/SidebarData';
import '../styles/sidebar.css';
import { useActionContext } from '../contexts/action_context';
import {useUserContext} from '../../context/user_context';
import Translate from '../../Translate';
import { useLanguageContext } from '../../context/language_context';

const Sidebar = () => {
  const {language} = useLanguageContext();
  const {myUser} = useUserContext();
  const {setDashboardTitle, isSidebarShow} = useActionContext();

  const {pathname} = useLocation();
  React.useEffect(()=>{
    SidebarData.forEach((item)=>{
      if(pathname.split('/').includes(item.path)){
        setDashboardTitle(item.text);
      }
    })
  }, [pathname]);


  return (
    <div className={isSidebarShow?"dash-sidebar show":"dash-sidebar"}>
      <div className={language==='kh'?"link-wrapper font-khmer":"link-wrapper"}>
        {
          SidebarData.map(item=>{
            if(item.id===7 && myUser.role==='manager'){
              return;
            }
            return (
              <NavLink key={item.id} to={item.path} end className="nav-link">
                {item.icon}
                <span><Translate>{item.text}</Translate></span>
              </NavLink>
            );
          })
        }
      </div>
    </div>
  )
}

export default Sidebar