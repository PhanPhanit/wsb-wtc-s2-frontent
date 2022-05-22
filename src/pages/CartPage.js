import React from 'react'
import {Link} from 'react-router-dom';
import {FaTrashAlt} from 'react-icons/fa';
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai';
import '../styles/cartPage.css';
import {useCartContext} from '../context/cart_context';
import {
    formatMoney,
    sortName
} from '../utils/Tools';
import Translate from '../Translate';
import { useLanguageContext } from '../context/language_context';

function CartPage() {
    const {language} = useLanguageContext();
    const {
        cart,
        subtotal,
        shipping_fee,
        removeItem,
        clearCart,
        toggleAmount,
        cart_loading
    } = useCartContext();

    React.useEffect(()=>{
        window.scrollTo(0, 0);
    }, []);

    return (
        <section className={language=='kh'?"cart-section font-khmer":"cart-section"}>
            <div className="wrapper-global">
                <div className="cart-title font-cat"><Translate>cart_your_cart</Translate></div>
                <div className="cart-container">
                    <div className="cart-des-title">
                        <span><Translate>cart_item</Translate></span>
                        <span><Translate>cart_price</Translate></span>
                        <span><Translate>cart_quantity</Translate></span>
                        <span><Translate>cart_subtotal</Translate></span>
                        <span></span>
                    </div>
                    <hr />
                    <div className="item-container">
                        {
                            cart_loading?(
                                <div className="cart-wrapper">
                                    <div className="cart-lds-ring"><div></div><div></div><div></div><div></div></div>
                                </div>
                            ):
                            cart.length===0?(
                                <div className="cart-wrapper">
                                    <h2><Translate>cart_no_item</Translate></h2>
                                </div>
                            ):
                            (
                                cart.map((item)=>{
                                    const {
                                        _id: cartId,
                                        image,
                                        product: {
                                            name,
                                            discount,
                                            price,
                                            author
                                        },
                                        quantity
                                    } = item;
                                    return (
                                        <div key={cartId} className="single-item">
                                            <div className="p-item">
                                                <div className="img-box">
                                                    <img src={image} alt="Yuri Herrera" />
                                                </div>
                                                <div className="info">
                                                    <h4>{sortName(name, 50)}</h4>
                                                    <span className='author'>{author}</span>
                                                    <span className='price'>{formatMoney(price - discount)}</span>
                                                    <span className='discount'>{discount===0?"":formatMoney(discount)}</span>
                                                </div>
                                            </div>
                                            <span className="price">{formatMoney(price - discount)}</span>
                                            <div className="quantity-change">
                                                <button type="button" onClick={()=>toggleAmount(cartId, "decrease", quantity)}>
                                                    <AiOutlineMinus className="icon" />
                                                </button>
                                                <span>{quantity}</span>
                                                <button type="button" onClick={()=>toggleAmount(cartId, "increase", quantity)}>
                                                    <AiOutlinePlus className="icon" />
                                                </button>
                                            </div>
                                            <span className="sub-total">{formatMoney((price-discount)*quantity)}</span>
                                            <div className="remove-item">
                                                <button type="button" onClick={()=>removeItem(cartId)}>
                                                    <FaTrashAlt className="icon-remove" />
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                            )
                        }
                        {/* <div className="single-item">
                            <div className="p-item">
                                <div className="img-box">
                                    <img src="https://m.media-amazon.com/images/I/51G+WN7UghL.jpg" alt="Yuri Herrera" />
                                </div>
                                <div className="info">
                                    <h4>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente, eos!</h4>
                                    <span className='author'>Transi Ated</span>
                                    <span className='price'>$29.99</span>
                                    <span className='discount'>$10</span>
                                </div>
                            </div>
                            <span className="price">$29.99</span>
                            <div className="quantity-change">
                                <button type="button">
                                    <AiOutlineMinus className="icon" />
                                </button>
                                <span>1</span>
                                <button type="button">
                                    <AiOutlinePlus className="icon" />
                                </button>
                            </div>
                            <span className="sub-total">$29.99</span>
                            <div className="remove-item">
                                <button type="button">
                                    <FaTrashAlt className="icon-remove" />
                                </button>
                            </div>
                        </div> */}
                    </div>
                    <hr />
                    <div className="btn-container">
                        <Link to="/" className="btn-shopping"><Translate>cart_continue_shopping</Translate></Link>
                        <button className={language=='kh'?"btn-clear font-khmer":"btn-clear"} type="button" onClick={clearCart}><Translate>cart_clear_all_item</Translate></button>
                    </div>
                </div>
                <section className="summary-container">
                    <div className="summary-box">
                        <h2 className="title"><Translate>cart_summary</Translate></h2>
                        <hr />
                        <div>
                            <span><Translate>cart_subtotal</Translate>:</span>
                            <span>{formatMoney(subtotal)}</span>
                        </div>
                        <div>
                            <span><Translate>cart_shipping_fee</Translate>:</span>
                            <span>{formatMoney(shipping_fee)}</span>
                        </div>
                        <hr />
                        <div>
                            <span><Translate>cart_order_total</Translate>:</span>
                            <span>{formatMoney(subtotal + shipping_fee)}</span>
                        </div>




                        <Link to="/checkout" className={cart.length===0?"btn-checkout disable":"btn-checkout"}><Translate>cart_checkout</Translate></Link>
                    </div>
                </section>
            </div>
        </section>
    )
}

export default CartPage
