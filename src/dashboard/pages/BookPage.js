import React, {useEffect, useState} from 'react';
import '../styles/bookPage.css';
import '../styles/dashTable.css';
import '../styles/dashPagination.css';
import {FaSearch, FaEdit, FaTrashAlt} from 'react-icons/fa';
import {AiOutlinePlus} from 'react-icons/ai';
import Pagination from '@mui/material/Pagination';
import { useDashBookContext } from '../contexts/dash_book_context';
import { useActionContext } from '../contexts/action_context';
import { productUrl } from '../../UrlEndPoint';
import { categoryUrl } from '../../UrlEndPoint';
import {formatMoney} from '../../utils/Tools';
import Translate, { translateText } from '../../Translate';
import { useLanguageContext } from '../../context/language_context';

const BookPage = () => {
  const {language} = useLanguageContext();
  const {openFormCreate, openFormUpdate} = useActionContext();
  const {
    fechProduct,
    products,
    currentPage,
    totalPage,
    fetchCategory,
    categories,
    setUpdateProductId,
    deleteProduct
  } = useDashBookContext();
  const [fetchProductLoading, setFetchProductLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(false);
  const [productPage, setProductPage] = useState(1);
  const [filterCategory, setFilterCategory] = useState('all');
  const [productSearch, setProductSearch] = useState("");



  const firstFetchProduct = async () => {
    setFetchProductLoading(true);
    try {
      await fechProduct(`${productUrl}/all?page=${productPage}&sort=-createdAt`);
    } catch (error) {
      console.log(error);
    }
    setFetchProductLoading(false);
  }
  const firstFetchCategory = async () => {
    try {
      await fetchCategory(`${categoryUrl}/all?isShow=true&sort=-createdAt`);
    } catch (error) {
      console.log(error);
    }
  }

  const pageChange = async (_, value) => {
    setProductPage(value);
    setTableLoading(true);
    let url = `${productUrl}/all?page=${value}&sort=-createdAt`;
    if(filterCategory!=='all'){
      url += `&category=${filterCategory}`;
    }
    if(productSearch!==""){
      url += `&search=${productSearch}`;
    }
    try {
      await fechProduct(url);
    } catch (error) {
      console.log(error);
    }
    setTableLoading(false);
  }
  const handleFilterCategoryChange = async (e) => {
    setProductSearch("");
    const value = e.currentTarget.value;
    setFilterCategory(value);
    setProductPage(1)
    setTableLoading(true);
    let url;
    if(value==='all'){
      url = `${productUrl}/all?page=1&sort=-createdAt`;
    }else{
      url = `${productUrl}/all?page=1&category=${value}&sort=-createdAt`;
    }
    try {
      await fechProduct(url);
    } catch (error) {
      console.log(error);
    }
    setTableLoading(false);

  }

  const handleSearch = async (e) => {
    e.preventDefault();
    setProductPage(1);
    setTableLoading(true);
    let url = `${productUrl}/all?page=${1}&search=${productSearch}&sort=-createdAt`;
    if(filterCategory!=='all'){
      url += `&category=${filterCategory}`;
    }
    console.log(url);
    try {
      await fechProduct(url);
    } catch (error) {
      console.log(error);
    }
    setTableLoading(false);
  }

  const handleEditBook = (bookId) => {
    openFormUpdate();
    setUpdateProductId(bookId);
  }

  useEffect(()=>{
    firstFetchProduct();
    firstFetchCategory();
  }, []);


  if(fetchProductLoading){
    return (
      <div className="dash-loading">
        <div className="dash-lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    );
  }

  return (
    <div className="dash-book-wrapper">
      <div className="search-create">
        <form className="frm-search" onSubmit={handleSearch}>
          <input
            className={language==='kh'?"font-khmer":""}
            type="text"
            placeholder={translateText(language, "dash_search_here")}
            value={productSearch}
            onChange={e=>setProductSearch(e.target.value)}
          />
          <button type="submit">
            <FaSearch className="search-icon" />
          </button>
        </form>
        <button className="btn-create" onClick={openFormCreate}>
          <span className={language==='kh'?"font-khmer":""}><Translate>dash_create</Translate></span>
          <AiOutlinePlus className="icon" />
        </button>
      </div>
      <div className="filter-book">
        <select value={filterCategory} onChange={handleFilterCategoryChange} className={language==='kh'?"font-khmer":""}>
          <option value="all">{translateText(language, "dash_all")}</option>
          {
            categories.map((category, index)=>{
              const {_id: id, name} = category;
              return (
                <option key={index} value={id}>{name}</option>
              );
            })
          }
        </select>
      </div>
      <div className={language==='kh'?"book-table-wrapper font-khmer":"book-table-wrapper"}>
        <table className="dash-tbl">
          <thead>
            <tr>
              <th width="80"><Translate>dash_no</Translate></th>
              <th className="title"><Translate>dash_name</Translate></th>
              <th width="80"><Translate>dash_price</Translate></th>
              <th width="80"><Translate>dash_discount</Translate></th>
              <th width="200"><Translate>dash_photo</Translate></th>
              <th width="80"><Translate>dash_show</Translate></th>
              <th width="80"><Translate>dash_edit</Translate></th>
              <th width="80"><Translate>dash_delete</Translate></th>
            </tr>
          </thead>
          <tbody>
            {
              !tableLoading && products.map((product, index)=>{
                const {_id: id, name, isShow, image, price, discount} = product;
                const altIndex = 10 * currentPage - 10 + (index + 1);
                return (
                  <tr key={index}>
                    <td>{altIndex}</td>
                    <td className="title">{name}</td>
                    <td>{formatMoney(price)}</td>
                    <td>{formatMoney(discount)}</td>
                    <td className="photo">
                      <div className="img-box">
                        <img src={image[0]} alt={name} />
                      </div>
                    </td>
                    <td>{isShow.toString()}</td>
                    <td><FaEdit className="icon-edit" onClick={()=>handleEditBook(id)} /></td>
                    <td><FaTrashAlt className="icon-delete" onClick={()=>deleteProduct(id)} /></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

      {/* product loading */}
      {
        tableLoading && (
          <div className="loading-wrapper">
            <div className="dash-loading">
              <div className="dash-lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
          </div>
        )
      }
      {/* end product loading */}

      {/* no product */}
      {
        !tableLoading && products.length === 0 && (
          <div className="d-flex align-item-center justify-content-center m-top-20">
            <h2>No product</h2>
          </div>
        )
      }
      {/* end no product */}

      {
        !tableLoading && products.length !== 0 && (
          <div className="book-pagination-wrapper">
            <div className="dash-pagination">
              <Pagination
                count={totalPage}
                shape="rounded"
                page={productPage}
                onChange={pageChange}
              />
            </div>
          </div>
        )
      }
    </div>
  )
}

export default BookPage