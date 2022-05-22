import React, {useEffect, useState} from 'react';
import '../styles/dashCategoryPage.css';
import '../styles/dashTable.css';
import {AiOutlinePlus} from 'react-icons/ai';
import {FaEdit, FaTrashAlt} from 'react-icons/fa';
import { useDashCategoryContext } from '../contexts/dash_category_context';
import { useActionContext } from '../contexts/action_context';
import Translate from '../../Translate';
import { useLanguageContext } from '../../context/language_context';

const CategoryPage = () => {
  const {language} = useLanguageContext();
  const {openFormCreate, openFormUpdate} = useActionContext();
  const [categoryLoading, setCategoryLoading] = useState(true);
  const {
    fetchCategory,
    categories,
    deleteCategory,
    setUpdateCategoryId
  } = useDashCategoryContext();

  useEffect(()=>{
    fetchAllCategory();
  }, []);

  const fetchAllCategory = async () => {
    setCategoryLoading(true);
    await fetchCategory();
    setCategoryLoading(false);
  }

  const handleEditCategory = (categoryId) => {
    openFormUpdate();
    setUpdateCategoryId(categoryId);
  }

  if(categoryLoading){
    return (
      <div className="dash-loading">
        <div className="dash-lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    );
  }

  return (
    <div className={language==='kh'?"dash-cate-wrapper font-khmer":"dash-cate-wrapper"}>
      <div className="name-create">
        <h2><Translate>dash_category_list</Translate></h2>
        <button type="button" className={language==='kh'?"btn-create font-khmer":"btn-create"} onClick={openFormCreate}>
          <span><Translate>dash_create</Translate></span>
          <AiOutlinePlus className="icon" />
        </button>
      </div>
      <div className="cate-table-wrapper">
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
              categories.map((category, index)=>{
                const numbering = index + 1;
                return (
                  <tr key={index}>
                    <td>{numbering}</td>
                    <td className="title">{category.name}</td>
                    <td className="photo">
                      <div className="slide-photo">
                        <img src={category.image} alt={category.name} />
                      </div>
                    </td>
                    <td>{category.isShow.toString()}</td>
                    <td><FaEdit className="icon-edit" onClick={()=>handleEditCategory(category._id)} /></td>
                    <td><FaTrashAlt className="icon-delete" onClick={()=>deleteCategory(category._id)} /></td>
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

export default CategoryPage