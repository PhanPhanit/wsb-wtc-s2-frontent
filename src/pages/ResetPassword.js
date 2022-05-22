import React, {useState} from 'react'
import {Link, useLocation} from 'react-router-dom';
import ReadBook from '../images/read-book.png'
import GoogleLogo from '../images/google.png';
import FacebookLogo from '../images/facebook.png';
import {FaRegEnvelope, FaEyeSlash, FaEye} from 'react-icons/fa';
import '../styles/signup-singin.css';
import {toast} from 'react-toastify';
import axios from 'axios';
import {useUserContext} from '../context/user_context';
import {useNavigate} from 'react-router-dom';
import {
    resetPasswordUrl
} from '../UrlEndPoint';


function useQuery() {
    return new URLSearchParams(useLocation().search);
  }


const ResetPassword = () => {
    const navigate = useNavigate();
    const query = useQuery();
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmNewPassword] = useState(false);
    const [resetPasswordSuccess,setResetPasswordSuccess] = useState(false);
    const [btnDisabel, setBtnDisable] = useState(true);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState({
        newPassword: '',
        confirmPassword: ''
    })
    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputValue({...inputValue, [name]:value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = {
                password: inputValue.newPassword,
                token: query.get('token'),
                email: query.get('email')
            }
            await axios.post(resetPasswordUrl, data);
            setLoading(false);
            setResetPasswordSuccess(true);
            setTimeout(()=>{
                navigate('/signin');
            }, 5000);
        } catch (error) {
            if(error.response){
                const {msg} = error.response.data;
                toast.error(msg)
            }
            setLoading(false);
        }
    }

    const handleNewPasswordMatch = (e) => {
        const value = e.target.value;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        const isPasswordMatch = value.match(passwordRegex);
        if(isPasswordMatch && value===inputValue.confirmPassword){
            setBtnDisable(false);
        }else{
            setBtnDisable(true);
        }
    }

    const handleConfirmPasswordMatch = (e) => {
        const inputConfirmPass = e.target;
        const value = inputConfirmPass.value;
        const inputMsg = inputConfirmPass.nextSibling;
        if(value!==inputValue.newPassword){
            inputConfirmPass.style.border = "1px solid red";
            inputMsg.style.display = "block";
            setBtnDisable(true);
        }else{
            inputConfirmPass.style.border = "1px solid #CCCCCC";
            inputMsg.style.display = "none";
            setBtnDisable(false);
        }
    }


    if(resetPasswordSuccess){
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
                <span className="alert-text">Success, redirecting to login page shortly</span>
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
                        <span>Reset your password here.</span>
                    </div>
                    <form className="frm" onSubmit={handleSubmit}>
                        <h3>Reset Password</h3>
                        <div className="frm-control">
                            <label htmlFor="newPassword">New Password</label>
                            <div className="input">
                                <input
                                    type={`${showNewPassword?'text':'password'}`}
                                    name="newPassword"
                                    id="newPassword"
                                    onChange={handleInputChange}
                                    placeholder="Enter new password"
                                    pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                                    onInput={handleNewPasswordMatch}
                                />
                                <span className="error-msg">Minimum eight characters, at least one letter, one number and one special character</span>
                                {
                                    showNewPassword? <FaEyeSlash className="icon" onClick={()=>setShowNewPassword(false)} />:<FaEye className="icon" onClick={()=>setShowNewPassword(true)} />
                                }
                            </div>
                        </div>
                        <div className="frm-control">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className="input">
                                <input
                                    type={`${showConfirmPassword?'text':'password'}`}
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    onChange={handleInputChange}
                                    placeholder="Confirm password"
                                    onInput={handleConfirmPasswordMatch}
                                />
                                <span className="error-msg">Not match!</span>
                                {
                                    showConfirmPassword? <FaEyeSlash className="icon" onClick={()=>setShowConfirmNewPassword(false)} />:<FaEye className="icon" onClick={()=>setShowConfirmNewPassword(true)} />
                                }
                            </div>
                        </div>
                        <div className="frm-control btn-container">
                            <button type="submit" className={loading || btnDisabel?"btn-submit disable":"btn-submit"}>
                                {
                                    loading && <div className="spinner-load"></div>
                                }
                                <span>Reset Password</span>
                            </button>
                            <p><span>Don't have account?</span> <Link to="/signup">Create an account</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ResetPassword
