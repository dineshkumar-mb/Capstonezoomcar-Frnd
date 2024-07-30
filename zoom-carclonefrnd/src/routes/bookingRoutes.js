
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../pages/checkoutform';

// Load your publishable key from the Stripe dashboard
const stripePromise = loadStripe(pk_live_51PfEQKIGMXT0myEMnbY3BWtoodTihqSb7uC5ywcUPFm8KaNDY0c49TwlT99hJvmXrYKdw0SIFMWHDRdt8N8o98l300sB5gIJR8);

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default App;
