import React from 'react'
import {Link as LinkScroll} from 'react-scroll';
import {Link} from 'react-router-dom';
import {AiOutlineClose} from 'react-icons/ai';
import {NavbarData} from './../utils/NavbarData';
import '../styles/sidebar.css';
import {useActionContext} from '../context/action_context';

function Sidebar() {
    const {isOpenSidebar, closSidebar} = useActionContext();
    return (
        <> 
            <aside className={isOpenSidebar?"sidebar open-sidebar":"sidebar"}>
                <div className="header">
                    <AiOutlineClose className="close-icon" onClick={closSidebar} />
                </div>
                <div className="navbar">
                    <ul>
                        {
                            NavbarData.map(item=>{
                                const {id, title, link} = item;
                                if(item.link==='dropbox'){
                                    return (
                                        <li key={id} className="parent-drop">
                                            <a>{title}</a>
                                            <div className="dropbox">
                                                <span>Khmer</span>
                                                <span>English</span>
                                            </div>
                                        </li>
                                    );
                                }
                                return (
                                    <li key={id}>
                                        <LinkScroll to={link} spy={true} smooth={true} duration={1000}>
                                            {title}
                                        </LinkScroll>
                                    </li>
                                );
                            })
                        }
                        <li>
                            <Link to="/signup" className="btn-signup">
                                Sign Up
                            </Link>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}

export default Sidebar
