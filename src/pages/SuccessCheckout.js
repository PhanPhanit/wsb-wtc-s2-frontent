import React from 'react'
import {Link, useNavigate} from 'react-router-dom';
import {BsCheckCircle} from 'react-icons/bs';
import '../styles/successCheckout.css';
import { useActionContext } from '../context/action_context';
import Translate from '../Translate';

const SuccessCheckout = () => {
  const navigate = useNavigate();
  const {historyClick} = useActionContext();

  const gotoHistory = () => {
    historyClick();
    navigate('/profile');
  }

  return (
    <div className="wrapper-global checkout-success font-khmer">
      <BsCheckCircle className="icon-circle" />
      <h2><Translate>success_purchase</Translate></h2>
      <div className="d-flex gap-10">
        <Link to="/" className="checkout-btn-shopping"><Translate>continue_shopping</Translate></Link>
        <button className="checkout-btn-history" onClick={gotoHistory}><Translate>go_to_history</Translate></button>
      </div>
      
    </div>
  )
}
export default SuccessCheckout