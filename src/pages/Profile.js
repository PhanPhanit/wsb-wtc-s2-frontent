import React from 'react'
import {FaUser} from 'react-icons/fa';
import '../styles/profile.css'
import {ProfileAccount, ProfileHistory} from '../components';
import {useActionContext} from '../context/action_context';
import { useUserContext } from '../context/user_context';
import Translate from '../Translate';
import { useLanguageContext } from '../context/language_context';

function Profile() {
    const {isAccountOpen, isHistoryOpen, historyClick, accountSettingClick} = useActionContext();
    const {myUser} = useUserContext();
    const {language} = useLanguageContext();
    return (
        <div id="profile" className={language==='kh'?"font-khmer":"font-poppin"}>
            <div className="wrapper-global profile-wrapper">
                <div className='left'>
                    <div className="profile-info">
                        <div className="user">
                            <FaUser className='icon' />
                        </div>
                        <h3>{myUser.name}</h3>
                        <p>{myUser.email}</p>
                    </div>
                    <div className="menu-wrapper">
                        <button type="button" className={`${isAccountOpen?"account active font-khmer":"account font-khmer"}`} onClick={accountSettingClick}><Translate>account_setting</Translate></button>
                        <button type="button" className={`${isHistoryOpen?"History active font-khmer":"History font-khmer"}`} onClick={historyClick}><Translate>history</Translate></button>
                    </div>
                </div>
                {
                    isAccountOpen && <ProfileAccount />
                }
                {
                    isHistoryOpen && <ProfileHistory />
                }
            </div>
        </div>
    )
}

export default Profile
