import React from 'react'
import {Link} from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import {MdOutlineSell} from 'react-icons/md';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import ReactStars from "react-rating-stars-component";
import '../styles/viewBookSlide.css'
import SlideLoading from './SlideLoading';
import {
    numberWithCommas,
    formatMoney,
    sortName
} from '../utils/Tools';

const ViewBookSlide = ({product=[], loading=true, error=false}) => {
    SwiperCore.use([Navigation]);
    if(loading){
        return (
            <SlideLoading />
        );
    }
    return (
            <div className="wrapper-global view-book-slide">
                <Swiper
                    className="swiper-arrive font-khmer"
                    speed={500}
                    spaceBetween={30}
                    slidesPerView={1}
                    loop={true}
                    navigation={true}
                    breakpoints={{
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 20
                        },
                        440: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 20
                        },
                        1100: {
                            slidesPerView: 4,
                            spaceBetween: 20
                        },
                        1470: {
                            slidesPerView: 5,
                            spaceBetween: 20
                        }
                    }}
                    >


                    {
                        product.map((item)=>{
                            const {
                                _id: productId,
                                name,
                                author,
                                sold,
                                price,
                                discount,
                                numOfReviews,
                                averageRating,
                                image
                            } = item;
                            return (
                                <SwiperSlide key={productId} className="box-arrive">
                                    <Link to={`/viewbook/${productId}`}>
                                        <img src={image[0]} alt={name} />
                                    </Link>
                                    <div className="info">
                                        <h4 className="title">
                                            <Link to={`/viewbook/${productId}`} className="link-none font-title">{sortName(name, 40)}</Link>
                                        </h4>
                                        <span className="author">{sortName(author, 20)} (author)</span>
                                        <div className="sold-dis">
                                            <div className="sold">
                                                <MdOutlineSell /><span>{numberWithCommas(sold)} sold</span>
                                            </div>
                                            <div className="dis-price">{discount===0?"":formatMoney(discount)}</div>
                                        </div>
                                        <div className="star-price">
                                            <div className="star">
                                                <ReactStars
                                                    classNames="star-icon"
                                                    value={averageRating}
                                                    isHalf={true}
                                                    edit={false}
                                                    />
                                                <span>{numberWithCommas(numOfReviews)}</span>
                                            </div>
                                            <div className="price">{formatMoney(price - discount)}</div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            );
                        })
                    }


                    {/* <SwiperSlide className="box-arrive">
                        <Link to="/viewbook/123">
                            <img src="https://m.media-amazon.com/images/I/51G+WN7UghL.jpg" alt="Yuri Herrera" />
                        </Link>
                        <div className="info">
                            <h4 className="title">
                                <Link to="/viewbook/123" className="link-none font-title">Yuri Herreradsfewfewfewfefewfewfefewfewfwfew</Link>
                            </h4>
                            <span className="author">Transi Ated (author)</span>
                            <div className="sold-dis">
                                <div className="sold">
                                    <MdOutlineSell /><span>200 sold</span>
                                </div>
                                <div className="dis-price">$24.99</div>
                            </div>
                            <div className="star-price">
                                <div className="star">
                                    <ReactStars
                                        classNames="star-icon"
                                        value={3.7}
                                        isHalf={true}
                                        edit={false}
                                        />
                                    <span>39,210</span>
                                </div>
                                <div className="price">$29.99</div>
                            </div>
                        </div>
                    </SwiperSlide> */}
                    
                </Swiper>
            </div>
    )
}

export default ViewBookSlide
