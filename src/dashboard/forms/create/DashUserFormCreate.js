import React, {useState} from 'react';
import {AiOutlineClose} from 'react-icons/ai';
import '../../styles/dashFrm.css';
import {FaEyeSlash, FaEye} from 'react-icons/fa';
import { useActionContext } from '../../contexts/action_context';
import { useDashUserContext } from '../../contexts/dash_user_context';
import {toast} from 'react-toastify';
import { userUrl } from '../../../UrlEndPoint';
import {useLanguageContext} from '../../../context/language_context';
import Translate, {translateText} from '../../../Translate';

const DashUserFormCreate = () => {
    const {language} = useLanguageContext();
    const {closeFormCreate} = useActionContext();
    const {createUser} = useDashUserContext();
    const [createUserLoading, setCreateUserLoading] = useState(false);
    const [isPasswordShow, setIsPasswordShow] = useState(false);
    const [dataFormUser, setDataFormUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
        isActive: true
    });


    const handleInputChange = (e) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        if(name==='isActive'){
            setDataFormUser((oldData)=>{
                return {...oldData, [name]: value=="true"?true:false};
            });
        }else{
            setDataFormUser((oldData)=>{
                return {...oldData, [name]: value};
            });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCreateUserLoading(true);
        try {
            await createUser(userUrl, dataFormUser);
            setCreateUserLoading(false);
            closeFormCreate();
            toast.success("Create user successfully.");
        } catch (error) {
            if(error.response){
                const {msg} = error.response.data;
                toast.error(msg)
            }
            setCreateUserLoading(false);
        }
    }

  return (
      <div className={language==='kh'?"w-100 h-100 overflow-y-scroll font-khmer":"w-100 h-100 overflow-y-scroll"}>
        <form className="dash-form-wrapper box-center w-700">
            <div className="header">
                <h2><Translate>dash_create_user</Translate></h2>
                <AiOutlineClose className="close-icon" onClick={closeFormCreate} />
            </div>
            <div className="body">
                <div className="input-wrapper">
                    <div className="frm-control">
                        <label htmlFor="name"><Translate>dash_name</Translate></label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder={translateText(language, "dash_name")}
                            onChange={handleInputChange}
                            value={dataFormUser.name}
                        />
                    </div>
                    <div className="frm-control">
                        <label htmlFor="email"><Translate>email</Translate></label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            placeholder={translateText(language, "email")}
                            onChange={handleInputChange}
                            value={dataFormUser.email}
                        />
                    </div>
                    <div className="frm-control">
                        <label htmlFor="password"><Translate>password</Translate></label>
                        <div className="input-control">
                            <input
                                type={isPasswordShow?"text":"password"}
                                name="password"
                                id="password"
                                placeholder={translateText(language, "password")}
                                value={dataFormUser.password}
                                onChange={handleInputChange}
                            />
                            {
                                isPasswordShow?(
                                    <FaEyeSlash className="icon" onClick={()=>setIsPasswordShow(false)} />
                                ):(
                                    <FaEye className="icon" onClick={()=>setIsPasswordShow(true)} />
                                )
                            }
                        </div>
                    </div>

                    <div className="frm-control">
                        <label htmlFor="role"><Translate>dash_role</Translate></label>
                        <select name="role" id="role" onChange={handleInputChange} value={dataFormUser.role}>
                            <option value="user">user</option>
                            <option value="manager">manager</option>
                            <option value="admin">admin</option>
                        </select>
                    </div>

                    <div className="frm-control">
                        <label htmlFor="isActive"><Translate>dash_active</Translate></label>
                        <select name="isActive" id="isActive" onChange={handleInputChange} value={dataFormUser.isActive}>
                            <option value="true">true</option>
                            <option value="false">false</option>
                        </select>
                    </div>

                </div>
            </div>
            <div className="footer">
                <button type="button" className={createUserLoading?"btn-frm btn-cancel disable":"btn-frm btn-cancel"} onClick={closeFormCreate}><Translate>cancel</Translate></button>
                <button type="submit" className={createUserLoading?"btn-frm btn-save disable":"btn-frm btn-save"} onClick={handleSubmit}>
                    {createUserLoading?<div className="button-spinner"></div>:<Translate>save</Translate>}
                </button>
            </div>
        </form>
    </div>
  )
}

export default DashUserFormCreate;