import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import {FaShoppingBag} from 'react-icons/fa';
import '../styles/viewBookDetail.css';
import {useUserContext} from '../context/user_context';
import {useProductContext} from '../context/product_context';
import {useCartContext} from '../context/cart_context';
import {
    numberWithCommas,
    formatMoney,
} from '../utils/Tools';


const ViewBookDetail = () => {
    const {myUser} = useUserContext();
    const {single_product: {product}} = useProductContext();
    const {addToCart} = useCartContext();
    const {
        name,
        image = [],
        author,
        published,
        publisher,
        language,
        country,
        numOfReviews = 0,
        averageRating,
        price,
        discount = 0,
        genre,
        description
    } = product;
    const [indexImage, setIndexImage] = useState(0);
    return (
        <section id="view-book-header" className="font-poppin">
            <div className="left">
                <div className="img-box">
                    {
                        image.map((singleImage, index)=>{
                            return (
                                <img key={index} className={index===indexImage?"active":""} src={singleImage} onClick={()=>setIndexImage(index)} alt={singleImage} />
                            )
                        })
                    }
                </div>
                <img src={image[indexImage]} alt={image[indexImage]} className="big-img" />
            </div>
            <div className="right">
                <div className="title">
                    <h2>{name}</h2>
                </div>
                <span>Date: {published}</span>
                <span className="subtitle">Author: {author}</span>
                <span className="subtitle">Publisher: {publisher}</span>
                <div className="stars-rating">
                    <ReactStars
                        classNames="star-icon"
                        value={averageRating}
                        isHalf={true}
                        edit={false}
                    />
                    <span>{numberWithCommas(numOfReviews)} ratings</span>
                </div>
                <div className="price">
                    <h3>Price: {formatMoney(price - discount)}</h3>
                    <span className="discount">{discount===0 ? "":formatMoney(discount)}</span>
                </div>
                <div className="info-book">
                    <div>
                        <span>Genre: </span> <h5>{genre}</h5>
                    </div>
                    <div>
                        <span>Country: </span> <h5>{country}</h5>
                    </div>
                    <div>
                        <span>Language: </span> <h5>{language}</h5>
                    </div>
                    <div>
                        <span>Published: </span> <h5>{published}</h5>
                    </div>
                </div>
                {
                    myUser? (
                        <Link to="/cart" className="btn-add-cart" onClick={()=>addToCart(product)}>
                            <FaShoppingBag className="icon" /> <span>ADD TO CART</span>
                        </Link>
                    ):(
                        <Link to="/signin" className="btn-add-cart">
                            <FaShoppingBag className="icon" /> <span>ADD TO CART</span>
                        </Link>
                    )
                }
            </div>
            <div className="description">
                <h3>Description</h3>
                <span>{description}</span>
            </div>
        </section>
    )
}

export default ViewBookDetail
