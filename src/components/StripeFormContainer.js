import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "../styles/stripe.css";
import {createPaymentIntent} from '../UrlEndPoint';
import axios from '../axiosPrivate';
import {useCartContext} from '../context/cart_context';
import {useOrderContext} from '../context/order_context';

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

export default function StripeFormContainer() {
  const {setPaymentIntent} = useOrderContext();
  const {subtotal, shipping_fee} = useCartContext();
  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axios.post(createPaymentIntent, {price: subtotal+shipping_fee})
      .then((res) => {
        const {clientSecret} = res.data;
        setClientSecret(clientSecret);
        setPaymentIntent(clientSecret);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#29a95f',
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="stript-wrapper">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}