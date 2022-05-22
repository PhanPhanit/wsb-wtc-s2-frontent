import React, {useState} from 'react';
import {AiOutlineClose} from 'react-icons/ai';
import '../../styles/dashFrm.css';
import PhotoUpload from '../../../images/photo-upload.jpg';
import UploadLoading from '../../../images/upload-loading.gif';
import { useActionContext } from '../../contexts/action_context';
import { useDashCategoryContext } from '../../contexts/dash_category_context';
import { uploadPhotoCloud } from '../../../UrlEndPoint';
import axios from 'axios';
import {toast} from 'react-toastify';
import {useLanguageContext} from '../../../context/language_context';
import Translate, {translateText} from '../../../Translate';

const DashCategoryFormCreate = () => {
    const {language} = useLanguageContext();
    const {closeFormCreate} = useActionContext();
    const {createCategory} = useDashCategoryContext();
    const [dataFormCategory, setDataFormCategory] = useState({name: "", image: "", isShow: true});
    const [photoLoading, setPhotoLoading] = useState(false);
    const [createCategoryLoading, setCreateCategoryLoading] = useState(false);


    const handleInputChange = (e) => {
        const name = e.currentTarget.name;
        const value = e.currentTarget.value;
        if(name==='isShow'){
            setDataFormCategory((oldData)=>{
                return {...oldData, [name]: value=="true"?true:false};
            });
        }else{
            setDataFormCategory((oldData)=>{
                return {...oldData, [name]: value};
            });
        }
    }
    const handleUploadImage = async (e) => {
        const formData = new FormData();
        formData.append("images", e.target.files[0]);
        setPhotoLoading(true);
        try {
            const response = await axios({
                method: "post",
                url: uploadPhotoCloud,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" }
            });
            const imageUrl = response.data.images[0];
            setDataFormCategory((oldData)=>{
                return {...oldData, image: imageUrl};
            });
        } catch (error) {
            console.log(error);
        }
        setPhotoLoading(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setCreateCategoryLoading(true);
        try {
            await createCategory(dataFormCategory);
            setCreateCategoryLoading(false);
            closeFormCreate();
            toast.success("Create category successfully.");
        } catch (error) {
            if(error.response){
                const {msg} = error.response.data;
                toast.error(msg)
            }
            setCreateCategoryLoading(false);
        }
    }
  return (
    <form className={language==='kh'?"dash-form-wrapper w-600 font-khmer":"dash-form-wrapper w-600"}>
        <div className="header">
            <h2><Translate>dash_create_new_category</Translate></h2>
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
                        placeholder={translateText(language, "dash_name_of_category")}
                        onChange={handleInputChange}
                        value={dataFormCategory.name}
                    />
                </div>
                <div className="frm-control">
                    <label htmlFor="isShow"><Translate>dash_show</Translate></label>
                    <select name="isShow" id="isShow" value={dataFormCategory.isShow} onChange={handleInputChange}>
                        <option value="true">true</option>
                        <option value="false">false</option>
                    </select>
                </div>
            </div>
            <div className="upload-photo">
                <h3><Translate>dash_photo</Translate></h3>
                <div className="img-box-wrapper">
                    <div className="img-box" style={{ backgroundImage: `url(${dataFormCategory.image || PhotoUpload})` }}>
                        {photoLoading && <img src={UploadLoading} alt="upload loading" className="upload-loading" />}
                        <input
                            type="file"
                            name="file"
                            id="file"
                            onChange={handleUploadImage}
                        />
                    </div>
                </div>
            </div>
        </div>
        <div className="footer">
            <button type="button" className={createCategoryLoading?"btn-frm btn-cancel disable":"btn-frm btn-cancel"} onClick={closeFormCreate}><Translate>cancel</Translate></button>
            <button type="submit" className={createCategoryLoading?"btn-frm btn-save disable":"btn-frm btn-save"} onClick={handleSubmit}>
                {createCategoryLoading?<div className="button-spinner"></div>:<Translate>save</Translate>}
            </button>
        </div>
    </form>
  )
}

export default DashCategoryFormCreate