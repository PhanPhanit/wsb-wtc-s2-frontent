import React from 'react'
import {AiFillEyeInvisible} from 'react-icons/ai';
import {FaEdit} from 'react-icons/fa';
import { useLanguageContext } from '../context/language_context';
import Translate, { translateText } from '../Translate';

const ProfileAccount = () => {
    const {language} = useLanguageContext();
    return (
        <div className="right">
            <h2 className='title'><Translate>account_setting</Translate></h2>
            <form className='frm'>
                <h3 className='sub-title'><Translate>user_name</Translate></h3>
                <div className="frm-control">
                    <label htmlFor="name"><Translate>name</Translate></label>
                    <div className="input-control input-top">
                        <input readOnly type="text" value="Phan Phanit" id='name' />
                        <button type="button"><FaEdit className='icon' /></button>
                    </div>
                </div>
            </form>
            <form className='frm'>
                <h3 className='sub-title'><Translate>email</Translate></h3>
                <div className="frm-control">
                    <label htmlFor="email"><Translate>email</Translate></label>
                    <div className="input-control input-top">
                        <input readOnly type="email" value="phanit12@gmail.com" id='email' />
                        <button type="button"><FaEdit className='icon' /></button>
                    </div>
                </div>
            </form>
            <form className='frm'>
                <h3 className='sub-title'><Translate>password</Translate></h3>
                <div className="frm-control">
                    <label htmlFor="email"><Translate>password</Translate></label>
                    <button type="button" className="change-password"><Translate>change_login_password</Translate></button>
                </div>
                <div className="password-input-wrapper active">
                    <div className="frm-control">
                        <label htmlFor="old-pass"><Translate>old_password</Translate></label>
                        <div className="input-control input-bottom">
                            <div>
                                <input type="password" id='old-pass' placeholder={translateText(language, "old_password")} />
                                <span className="eye"><AiFillEyeInvisible /></span>
                            </div>
                        </div>
                    </div>
                    <div className="frm-control">
                        <label htmlFor="new-pass"><Translate>new_password</Translate></label>
                        <div className="input-control input-bottom">
                            <div>
                                <input type="password" id='new-pass' placeholder={translateText(language, "new_password")} />
                                <span className="eye"><AiFillEyeInvisible /></span>
                            </div>
                        </div>
                    </div>
                    <div className="frm-control">
                        <label htmlFor="new-pass"><Translate>ry_type_password</Translate></label>
                        <div className="input-control input-bottom">
                            <div>
                                <input type="password" id='retype-pass' placeholder={translateText(language, "ry_type_password")} />
                                <span className="eye"><AiFillEyeInvisible /></span>
                            </div>
                            <button className="btn-save" type="button"><Translate>save</Translate></button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ProfileAccount
