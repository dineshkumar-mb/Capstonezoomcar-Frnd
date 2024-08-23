
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    setLoading(true); // Start loading

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setError(error.message);
      setLoading(false); // Stop loading
    } else {
      try {
        const response = await axios.post('https://capstonezoomcar-bknd.onrender.com/api/bookings/payment', {
          token: paymentMethod.id,
          amount: 5000, // Amount in cents
        });

        if (response.data.success) {
          setSuccess(true);
        }
      } catch (error) {
        setError('Payment failed');
      }
      setLoading(false); // Stop loading
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || loading}>
        {loading ? <Spinner /> : 'Pay'}
      </button>
      {error && <div>{error}</div>}
      {success && <div>Payment successful!</div>}
    </form>
  );
};

export default CheckoutForm;


// import React, { useState } from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import axios from 'axios';
// import Spinner from "../components/Spinner";

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
      
//     }

//     const cardElement = elements.getElement(CardElement);

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: 'card',
//       card: cardElement,
//     });

//     if (error) {
//       setError(error.message);
//     } else {
//       try {
//         const response = await axios.post('https://capstonezoomcar-bknd.onrender.com/api/bookings/payment', {
//           token: paymentMethod.id,
//           amount: 5000, // Amount in cents
//         });

//         if (response.data.success) {
//           setSuccess(true);
//         }
//       } catch (error) {
//         setError('Payment failed');
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit" disabled={!stripe}>
//         Pay
//       </button>
//       {error && <div>{error}</div>}
//       {success && <div>Payment successful!</div>}
//     </form>
//   );
// };

// export default CheckoutForm;
