import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import ReadBook from '../images/read-book.png'
import {FaRegEnvelope} from 'react-icons/fa';
import '../styles/signup-singin.css';
import {toast} from 'react-toastify';
import axios from 'axios';
import {
    forgotPasswordUrl
} from '../UrlEndPoint';

const ForgetPassword = () => {
    const [loading, setLoading] = useState(false);
    const [forgotSuccess, setForgotSuccess] = useState(false);
    const [email, setEmail] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(forgotPasswordUrl, {email});
            setLoading(false);
            setForgotSuccess(true);
        } catch (error) {
            if(error.response){
                const {msg} = error.response.data;
                toast.error(msg)
            }
            setLoading(false);
        }
    }

    if(forgotSuccess){
        return (
            <section id="signin-signup-section" className="font-poppin" style={{ 
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "20px"
             }}>
                <div className="line-top"></div>
                <div className="line-bottom"></div>
                <span className="alert-text">Please check your email for reset password link</span>
                <Link to="/" className="link-home">
                    Go home
                </Link>
            </section>
        );
    }


    return (
        <section id="signin-signup-section" className="font-poppin">
            <div className="line-top"></div>
            <div className="line-bottom"></div>
            <div className="sign-wrapper">
                <div className="left">
                    <img src={ReadBook} alt="Read Book" />
                </div>
                <div className="right" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div className="header">
                        <div className="logo">
                            <font>Wellcome to</font> <font>W</font><font>s</font><font>book</font>
                        </div>
                        <span>Forget your password here.</span>
                    </div>
                    <form className="frm" onSubmit={handleSubmit}>
                        <h3>Forgot Password</h3>
                        <div className="frm-control">
                            <label htmlFor="email">Enter your email address</label>
                            <div className="input">
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                />
                                <FaRegEnvelope className="icon" />
                                <span className="error-msg">message</span>
                            </div>
                        </div>
                        <div className="frm-control btn-container">
                            <button type="submit" className="btn-submit" style={{pointerEvents: loading?"none":"auto", opacity: loading?"0.6":"1"}}>
                                {
                                    loading && <div className="spinner-load"></div>
                                }
                                <span>Forgot Password</span>
                            </button>
                            <p><span>Don't have account?</span> <Link to="/signup">Create an account</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ForgetPassword
