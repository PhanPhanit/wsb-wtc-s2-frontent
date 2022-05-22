import React from 'react';
import {useNavigate} from 'react-router-dom';
import {FaBars} from 'react-icons/fa';
import {IoChevronDown} from 'react-icons/io5';
import {MdLogout} from 'react-icons/md';
import '../styles/navbar.css';
import Logo from '../../components/Logo';
import axios from 'axios';
import {toast} from 'react-toastify';
import { useActionContext } from '../contexts/action_context';
import { useUserContext } from '../../context/user_context';
import Translate from '../../Translate';
import { useLanguageContext } from '../../context/language_context';

const Navbar = () => {
    const navigate = useNavigate();
    const {language} = useLanguageContext();
    const {removeUser, setLoading, myUser} = useUserContext();
    const {
        isUserShow,
        setIsUserShow,
        dashboardTitle,
        isSidebarShow,
        setIsSidebarShow
    } = useActionContext();


    const handleLogout = async () => {
        setLoading(true);
        try {
            await axios.delete('/api/v1/auth/logout');
            removeUser();
            navigate("/");
            setLoading(false);
            toast.success("Logout successfully.");
        } catch (error) {
            setLoading(false);
            toast.success("Logout error.");
        }
    }

  return (
    <div className="dash-navbar">
        <div className="left">
            <Logo />
            <FaBars className="icon-bar" onClick={()=>setIsSidebarShow(!isSidebarShow)} />
        </div>
        <div className={language==='kh'?"center font-khmer":"center"}>
            <h2><Translate>{dashboardTitle}</Translate></h2>
        </div>
        <div className="right">
            <div className="user">
                <h2>{myUser.name}</h2>
                <IoChevronDown className="arrow-down" onClick={()=>setIsUserShow(!isUserShow)} />
                <ul className={isUserShow?"box-down show":"box-down"}>
                    <li className="header">
                        <h4>{myUser.email}</h4>
                    </li>
                    <li className={language==='kh'?"footer font-khmer":"footer"}>
                        <MdLogout className="logout-icon" onClick={handleLogout} />
                        <span onClick={handleLogout}><Translate>Logout</Translate></span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Navbar