import React, {useState} from 'react'
import ReactStars from 'react-rating-stars-component';
import "../styles/feedback.css";
import {useUserContext} from '../context/user_context';
import {useActionContext} from '../context/action_context';
import { useReviewContext } from '../context/review_context';
import Translate, { translateText } from '../Translate';
import { useLanguageContext } from '../context/language_context';

const Feedback = () => {
    const {language} = useLanguageContext();
    const [feedbackLoading, setFeedbackLoading] = useState(true);
    const [feedbackExist, setFeedbackExist] = useState(false);
    const {myUser:{userId}} = useUserContext();
    const {closeFeedback} = useActionContext();
    const {
        review: {
            rating,
            comment,
            product
        },
        setReivew,
        createReview,
        reviewLoading,
        checkReviewExist,
    } = useReviewContext();

    React.useEffect(()=>{
        // if exist
        handleCheckReviewExist();
        console.log(product);
    }, []);


    const handleCheckReviewExist = async () => {
        setFeedbackLoading(true);
        setFeedbackExist(false);
        const {message, error} = await checkReviewExist(product, userId);
        setFeedbackExist(message);
        setFeedbackLoading(false);
    }

    const starChange = (value) => {
        setReivew((oldReview)=>{
            return {...oldReview, rating: value};
        });
    }
    const handleCloseFeedback = () => {
        closeFeedback();
        setReivew({rating: 0, comment: "", product: ""});
    }
    const handleSubmitFeedback = async () => {
        await createReview();
        closeFeedback();
        setReivew({rating: 0, comment: "", product: ""});
    }

    return (
        <div className={language==='kh'?"black-background show font-khmer":"black-background show"}>
            {
                feedbackLoading?(
                    <div className="checking-wrapper">
                        <p><Translate>checking</Translate>...</p>
                    </div>
                ):feedbackExist?(
                    <div className="feedback-exist-wrapper">
                        <p><Translate>checking_feedback_text</Translate></p>
                        <button className="btn-exist-close" onClick={handleCloseFeedback}><Translate>close</Translate></button>
                    </div>
                ):(
                    <form className="frm">
                        <textarea
                            className="feedback-text font-khmer"
                            placeholder={translateText(language, "your_feedback")}
                            value={comment}
                            onChange={(e)=>setReivew({rating, comment: e.target.value, product})}
                        ></textarea>
                        <div className="star-text">
                            <span><Translate>like_this_book</Translate></span>
                            <h4><Translate>rate_now</Translate></h4>
                            <ReactStars
                                classNames="star-icon"
                                value={rating}
                                isHalf={true}
                                onChange={starChange}
                            />
                        </div>
                        <div className="btn-container">
                            <button type="button" className="btn-close" onClick={handleCloseFeedback}><Translate>close</Translate></button>
                            <button type="button" onClick={handleSubmitFeedback} className={rating!==0&&comment&&product&&!reviewLoading?"btn-send":"btn-send btn-send-disable"}>{reviewLoading?<Translate>loading</Translate>:<Translate>send</Translate>}</button>
                        </div>
                    </form>
                )
            }
        </div>
    )
}

export default Feedback
