import React, {useEffect, useState} from 'react';
import '../styles/customerRate.css';
import ReactStars from "react-rating-stars-component";
import {FaUser} from 'react-icons/fa';
import { useReviewContext } from '../context/review_context';
import { useProductContext } from '../context/product_context';
import {numberWithCommas} from '../utils/Tools';
const CustomerRate = ({productId}) => {
    const [page, setPage] = useState(1);
    const [starFilter, setStarFilter] = useState("all");
    const {
        getAllReview,
        allReview: {
            totalPage,
            reviews
        },
        starReview: {
            starPercent,
            starLoading
        },
        reviewLoading,
        emptyReviewPage,
        fetchPercentStar
    } = useReviewContext();
    const {single_product: {product}} = useProductContext();

    const [isFirst, setIsFirst] = useState(true);

    useEffect(()=>{
        getAllReview(productId, page, starFilter);
    }, [page]);

    useEffect(()=>{
        if(isFirst){
            setIsFirst(false);
            return;
        }
        emptyReviewPage();
        if(page===1){
            getAllReview(productId, page, starFilter);
        }else{
            setPage(1);
        }
    }, [starFilter]);

    useEffect(()=>{
        emptyReviewPage();
        fetchPercentStar(productId);
    }, []);

    const handleReviewPage = () => {
        setPage((oldPage)=>{
            if(oldPage>=totalPage){
                return oldPage;
            }
            return oldPage + 1;
        });
    }
    console.log(starPercent);
    return (
        <section className="customer-rate font-poppin">
            <div className="wrapper-global">

                {
                    starPercent.length>0 && (
                        <>
                            <h3 className="title">Customers Rate: {numberWithCommas(product.numOfReviews)}</h3>
                            <div className="product-total-stars">
                                <div className="left">

                                    {
                                        starPercent.map((star, index)=>{
                                            return (
                                                <div key={index} className="row">
                                                    <span>{star.star} Stars</span>
                                                    <div className="box-color-star">
                                                        <div className="percent-star" style={{width: `${star.percent}%`}}></div>
                                                    </div>
                                                    <div className="box-percent-star">
                                                        {star.percent}%
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }


                                    {/* <div className="row">
                                        <span>5 Stars</span>
                                        <div className="box-color-star">
                                            <div className="percent-star" style={{width: "91%"}}></div>
                                        </div>
                                        <div className="box-percent-star">
                                            91%
                                        </div>
                                    </div> */}

                                </div>
                                <div className="right">
                                    <span>{product.averageRating}</span>
                                    <ReactStars
                                        classNames="star-icon"
                                        value={product.averageRating}
                                        isHalf={true}
                                        edit={false}
                                    />
                                </div>
                            </div>
                        </>
                    )
                }

                
                <h3 className="title">Customers Review</h3>
                <div className="filter-review-star">
                    <select value={starFilter} onChange={e=>setStarFilter(e.target.value)}>
                        <option value="all">All</option>
                        <option value="5">5 stars</option>
                        <option value="4">4 stars</option>
                        <option value="3">3 stars</option>
                        <option value="2">2 stars</option>
                        <option value="1">1 stars</option>
                    </select>
                </div>
                <div className="customers-review">


                    {
                        reviewLoading && reviews.length===0? (
                            <div className="review-height">
                                <div className="review-loading"><div></div><div></div><div></div><div></div></div>
                            </div>
                        ):reviews.length===0?(
                            <div className="review-height">
                                <h2>No review</h2>
                            </div>
                        ):(
                            reviews.map((review)=>{
                                const {
                                    comment,
                                    createdAt,
                                    rating,
                                    user: {
                                        name
                                    }
                                } = review;
                                return (
                                    <div key={review._id} className="single-review">
                                        <div className="left">
                                            <div className="user">
                                                <FaUser className="icon" />
                                            </div>
                                        </div>
                                        <div className="right">
                                            <h4 className="name">{name}</h4>
                                            <div className="star-date">
                                                <ReactStars
                                                    classNames="star-icon"
                                                    value={rating}
                                                    isHalf={true}
                                                    edit={false}
                                                />
                                                <span>{createdAt.split('T')[0]}</span>
                                            </div>
                                            <p>
                                                {comment}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })
                        )
                    }
                </div>

                {
                    page<totalPage && (
                        <button type="button" onClick={handleReviewPage} className={reviewLoading?"see-more disable":"see-more"}>
                            {
                                reviewLoading?"loading...":"See more reviews"
                            }
                        </button>
                    )
                }
            </div>
        </section>
    )
}

export default CustomerRate
