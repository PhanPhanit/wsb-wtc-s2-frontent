import React, {useEffect, useState} from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/searchPage.css';
import ReactStars from 'react-rating-stars-component';
import axios from 'axios';
import { productUrl } from '../UrlEndPoint';
import {sortName, numberWithCommas, formatMoney} from '../utils/Tools';
import { useProductContext } from '../context/product_context';

const SearchPage = () => {
    const query = useQuery();
    const {
        setSearchQuery
    } = useProductContext();
    const [products, setProducts] = useState([]);
    const [searchLoading, setSearchLoading] = useState(true);

    const fetchProduct = async (url) => {
        setSearchLoading(true);
        try {
            const {data: {product}} = await axios.get(url);
            setProducts(product);
        } catch (error) {
            console.log(error);
        }
        setSearchLoading(false);
    }

    useEffect(()=>{
        setSearchQuery(query.get('search_query'));
    }, []);

    useEffect(()=>{
        let queryText = query.get('search_query');
        let url = `${productUrl}?search=${queryText}&limit=10000`;
        fetchProduct(url);
    }, [query.get('search_query')]);




    if(searchLoading){
        return (
            <section className="wrapper-global h-full search-page">
                <div className="search-keyword">
                    <div className="title">
                        <h2>Search: {query.get('search_query')}</h2>
                    </div>
                    <hr />
                </div>
                <div className="loading-wrapper">
                    <div className="general-lds-ring"><div></div><div></div><div></div><div></div></div>
                </div>
            </section>
        );
    }
  return (
    <section className="wrapper-global h-full search-page">
        <div className="search-keyword">
            <div className="title">
                <h2>Search: {query.get('search_query')}</h2>
            </div>
            <hr />
        </div>
        <div className="content-wrapper">
            {
                products.map((product, index)=>{
                    const {
                        _id: productId,
                        name,
                        author,
                        description,
                        averageRating,
                        numOfReviews,
                        price,
                        discount,
                        image
                    } = product;
                    return (
                        <React.Fragment key={index}>
                            <div className="single-box">
                                <div className="photo">
                                    <Link to={`/viewbook/${productId}`}>
                                        <img src={image[0]} alt={name} />
                                    </Link>
                                </div>
                                <div className="info">
                                    <Link to={`/viewbook/${productId}`}>
                                        <div className="info-wrapper">
                                            <div className="text-content">
                                                <div className="title">
                                                    <h2>Title: {sortName(name, 50)}</h2>
                                                </div>
                                                <div className="small-text">
                                                    <div>Description: </div> <span>{sortName(description, 180)}</span>
                                                </div>
                                                <div className="small-text">
                                                    <div>Author: </div> <span>{author}</span>
                                                </div>
                                                <div className="star-container">
                                                    <ReactStars
                                                        classNames="star-icon"
                                                        value={averageRating}
                                                        isHalf={true}
                                                        edit={false}
                                                    />
                                                    <span>{numberWithCommas(numOfReviews)}</span>
                                                </div>
                                            </div>
                                            <div className="price-container">
                                                <p>{formatMoney(price - discount)}</p>
                                                <p className="discount">{formatMoney(discount)}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <hr />
                        </React.Fragment>
                    );
                })
            }
        </div>
    </section>
  )
}

function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default SearchPage