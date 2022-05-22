import React from 'react'
import {Link} from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination } from 'swiper';
import {FaShoppingBag} from 'react-icons/fa';
import {MdOutlineSell} from 'react-icons/md';
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import ReactStars from "react-rating-stars-component";
import '../styles/newArrivalBox.css'
import {useProductContext} from '../context/product_context';
import {useUserContext} from '../context/user_context';
import {useCartContext} from '../context/cart_context';
import {formatMoney, numberWithCommas} from '../utils/Tools';
import Translate from '../Translate';
import { useLanguageContext } from '../context/language_context';

const NewArrivalBox = () => {
    const {language} = useLanguageContext();
    SwiperCore.use([Autoplay, Pagination]);
    const {myUser} = useUserContext();
    const {new_arrival: {
        product_new_arrival,
        loading,
        error
    }} = useProductContext();
    const {addToCart} = useCartContext();
    return (
        <section className={language=='kh'?"section-white font-khmer":"section-white font-poppin"}>
            <div className="wrapper-global wrapper-arrive">

                <div className="title-arrive">
                    <h2 className="font-cat"><Translate>body_new_arrival</Translate></h2>
                </div>
                <Swiper
                    className="swiper-arrive font-khmer"
                    speed={1000}
                    spaceBetween={30}
                    slidesPerView={1}
                    pagination={true}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
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
                            product_new_arrival.map(item=>{
                                const {
                                    _id: productId,
                                    name,
                                    image,
                                    price,
                                    discount,
                                    author,
                                    sold,
                                    numOfReviews,
                                    averageRating
                                } = item;
                                const sortName = name.length >= 45 ? name.substring(0, 45)+"...":name;
                                return (
                                    <SwiperSlide key={productId} className="box-arrive">
                                        <Link to={`/viewbook/${productId}`}>
                                            <img src={image[0]} alt="Yuri Herrera" />
                                        </Link>
                                        <div className="info">
                                            <h4 className="title">
                                                <Link to={`/viewbook/${productId}`} className="link-none font-title">{sortName}</Link>
                                            </h4>
                                            <span className="author">{author}</span>
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
                                            <div className="add-cart">
                                                {
                                                    myUser? (
                                                        <Link to="/cart" className="btn-add-cart" onClick={()=>addToCart(item)}>
                                                            <FaShoppingBag className="icon" /> <span><Translate>add_to_cart</Translate></span>
                                                        </Link>
                                                    ):(
                                                        <Link to="/signin" className="btn-add-cart">
                                                            <FaShoppingBag className="icon" /> <span><Translate>add_to_cart</Translate></span>
                                                        </Link>
                                                    )
                                                }
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
                            <span className="author">Transi Ated</span>
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
                            <div className="add-cart">
                                <Link to="/cart" className="btn-add-cart">
                                    <FaShoppingBag className="icon" /> <span>ADD TO CART</span>
                                </Link>
                            </div>
                        </div>
                    </SwiperSlide> */}
                    
                </Swiper>
            </div>
        </section>
    )
}

export default NewArrivalBox
