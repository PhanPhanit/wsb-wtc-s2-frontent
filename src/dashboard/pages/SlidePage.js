import React, {useState, useEffect} from 'react';
import '../styles/dashTable.css';
import '../styles/dashSlidePage.css';
import {AiOutlinePlus} from 'react-icons/ai';
import {FaEdit, FaTrashAlt} from 'react-icons/fa';
import { useActionContext } from '../contexts/action_context';
import { useDashSlideContext } from '../contexts/dash_slide_context';
import Translate from '../../Translate';
import { useLanguageContext } from '../../context/language_context';

const SlidePage = () => {
  const {language} = useLanguageContext();
  const {openFormCreate, openFormUpdate} = useActionContext();
  const [slideLoading, setSlideLoading] = useState(true);
  const {
    fetchSlide,
    slides,
    deleteSlide,
    setUpdateSlideId
  } = useDashSlideContext();

  useEffect(()=>{
    fetchAllSlide();
  }, []);

  const fetchAllSlide = async () => {
    setSlideLoading(true);
    await fetchSlide();
    setSlideLoading(false);
  }

  const handleEditCategory = (slideId) => {
    openFormUpdate();
    setUpdateSlideId(slideId);
  }

  if(slideLoading){
    return (
      <div className="dash-loading">
        <div className="dash-lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    );
  }


  return (
    <div className={language==='kh'?"dash-slide-wrapper font-khmer":"dash-slide-wrapper"}>
      <div className="name-create">
        <h2><Translate>dash_slide_list</Translate></h2>
        <button type="button" className="btn-create" onClick={openFormCreate}>
          <span className={language==='kh'?"font-khmer":""}><Translate>dash_create</Translate></span>
          <AiOutlinePlus className="icon" />
        </button>
      </div>
      <div className="slide-table-wrapper">
        <table className="dash-tbl">
          <thead>
            <tr>
              <th width="80"><Translate>dash_no</Translate></th>
              <th className="title"><Translate>dash_name</Translate></th>
              <th width="200"><Translate>dash_photo</Translate></th>
              <th width="80"><Translate>dash_show</Translate></th>
              <th width="80"><Translate>dash_edit</Translate></th>
              <th width="80"><Translate>dash_delete</Translate></th>
            </tr>
          </thead>
          <tbody>
            {
              slides.map((slide, index)=>{
                const numbering = index + 1;
                const {_id: id, title, product: {image}, isShow} = slide;
                return (
                  <tr key={index}>
                    <td>{numbering}</td>
                    <td className="title">{title}</td>
                    <td className="photo">
                      <div className="img-box">
                        <img src={image[0]} alt={title} />
                      </div>
                    </td>
                    <td>{isShow.toString()}</td>
                    <td><FaEdit className="icon-edit" onClick={()=>handleEditCategory(id)} /></td>
                    <td><FaTrashAlt className="icon-delete" onClick={()=>deleteSlide(id)} /></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SlidePage