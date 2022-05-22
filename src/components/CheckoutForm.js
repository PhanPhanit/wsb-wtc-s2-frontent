import React, { useEffect, useState } from "react";
import {useCartContext} from '../context/cart_context';
import {formatMoney} from '../utils/Tools';
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useOrderContext } from "../context/order_context";
import Translate from "../Translate";

export default function CheckoutForm() {
  const {subtotal, shipping_fee, cart, clearCart} = useCartContext();
  const {
    createOrder,
    paymentIntent,
    paymentInfo: {
      phoneNumber,
      city,
      address
    }
  } = useOrderContext();
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const redirectUrl = `${window.location.origin}/success-checkout`;
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const handleRedirectUrl = (url) => {
      const orderItem = cart.map((item)=>{
        const {
          quantity,
          image,
          product: {
            id: productId,
            name,
            discount,
            price
          },
        } = item;
        return {
          name,
          image,
          price,
          discount,
          quantity,
          product: productId
        }
      });

      const data = {
        delivery: shipping_fee,
        paymentIntent: paymentIntent,
        phoneNumber,
        city,
        address,
        orderDate: new Date(Date.now()).toISOString().split('T')[0],
        orderItem
      };
      createOrder(data);
      clearCart();
      return url;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: handleRedirectUrl(redirectUrl),
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <span className="total-price"><Translate>your_total_is</Translate> {formatMoney(subtotal+shipping_fee)}</span>
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : <Translate>pay_now</Translate>}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}