import React from 'react'
import {Link} from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import {useSlideBanner} from '../context/slide_banner_context';
import '../styles/slider.css';

const Slider = () => {
    SwiperCore.use([Autoplay]);
    const {
        slide_banner,
        slide_banner_loading: loading,
        slide_banner_error: error
    } = useSlideBanner();
    if(loading){
        return (
            <div className="section-slide slide-banner-loading">
                <div className="left">
                    <div className="sub-left">
                        <div className="loading-line1"></div>
                        <div className="loading-line2"></div>
                        <span className="sub-line1"></span>
                        <span className="sub-line2"></span>
                        <div className="loading-btn"></div>
                    </div>
                </div>
                <div className="right">
                    <div className="img"></div>
                </div>
            </div>
        );
    }
    return (
        <section className="section-slide font-poppin">
            <Swiper
                className="slide-wrapper"
                spaceBetween={50}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                speed={1000}
            >
                {
                    slide_banner.map((item)=>{
                        const {
                            _id: slideId,
                            title,
                            subtitle,
                            product: {
                                _id: productId,
                                image
                            }
                        } = item;
                        return (
                            <SwiperSlide key={slideId} className="slide">
                                <div className="left">
                                    <h2>{title}</h2>
                                    <p>{subtitle}</p>
                                    <Link className="btn link-btn" to={`/viewbook/${productId}`}>Shop Now</Link>
                                </div>
                                <div className="right">
                                    <img src={image[0]} alt={title} />
                                </div>
                            </SwiperSlide>
                        )
                    })
                }
                {/* <SwiperSlide className="slide">
                    <div className="left">
                        <h2>Discover your Unlimited Knowledge</h2>
                        <p>A new world contains in each every pages of the books.</p>
                        <Link className="btn link-btn" to="/products/:id">Shop Now</Link>
                    </div>
                    <div className="right">
                        <img src="https://covers.zlibcdn2.com/covers299/books/d6/c0/c9/d6c0c90690c750e1d17819b48c49ee0f.jpg" alt="Photo Book" />
                    </div>
                </SwiperSlide> */}
            </Swiper>
        </section>
    )
}

export default Slider
