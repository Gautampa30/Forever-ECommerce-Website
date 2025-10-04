import React, { useState, useEffect } from "react";
import { useStripe, 
    useElements,
     CardElement, 
     PaymentRequestButtonElement, 
     CardNumberElement,
  CardExpiryElement,
  CardCvcElement, } from "@stripe/react-stripe-js";

const StripeCheckoutForm = ({ clientSecret, amount, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [canMakePayment, setCanMakePayment] = useState(false);

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'IN',
        currency: 'inr',
        total: {
          label: 'Total',
          amount: amount,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      pr.canMakePayment().then(result => {
        if (result) {
          setPaymentRequest(pr);
          setCanMakePayment(true);
        }
      });

      pr.on('paymentmethod', async (event) => {
        const {error, paymentIntent} = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: event.paymentMethod.id,
          },
          {handleActions: false}
        );

        if (error) {
          event.complete('fail');
          onError(error.message);
        } else {
          event.complete('success');
          if (paymentIntent.status === 'requires_action') {
            const result = await stripe.confirmCardPayment(clientSecret);
            if (result.error) {
              onError(result.error.message);
            } else if (result.paymentIntent.status === "succeeded") {
              onSuccess(result.paymentIntent);
            }
          } else if (paymentIntent.status === 'succeeded') {
            onSuccess(paymentIntent);
          }
        }
      });
    }
  }, [stripe, clientSecret]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const card = elements.getElement(CardNumberElement);  // Get CardNumberElement explicitly
     if (!card) {
    onError("Card element not found.");
    setProcessing(false);
    return;
  }
const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
  payment_method: { card },
});


    setProcessing(false);

    if (error) {
      onError(error.message);
    } else if (paymentIntent.status === "succeeded") {
      onSuccess(paymentIntent);
    }
  };
  const elementStyle = {
    base: {
      fontSize: '16px',
      color: '#424770',
      letterSpacing: '0.025em',
      fontFamily: 'Source Code Pro, monospace',
      '::placeholder': { color: '#aab7c4' },
      padding: '10px 14px',
    },
    invalid: { color: '#9e2146' },
  };

  return (
    <>
      {canMakePayment && paymentRequest ? (
        <PaymentRequestButtonElement options={{ paymentRequest }} />
      ) : null}

     <form onSubmit={handleSubmit} style={{ maxWidth: 400, marginTop: 20 }}>
        <label>Card Number</label>
        <div style={{ border: '1px solid #ccc', borderRadius: 4, padding: 10, marginBottom: 15 }}>
          <CardNumberElement options={{ style: elementStyle }} />
        </div>

        <label>Expiry Date</label>
        <div style={{ border: '1px solid #ccc', borderRadius: 4, padding: 10, marginBottom: 15 }}>
          <CardExpiryElement options={{ style: elementStyle }} />
        </div>

        <label>CVC</label>
        <div style={{ border: '1px solid #ccc', borderRadius: 4, padding: 10, marginBottom: 15 }}>
          <CardCvcElement options={{ style: elementStyle }} />
        </div>

        <button
          type="submit"
          disabled={!stripe || processing}
          style={{
            marginTop: 10,
            width: '100%',
            padding: 12,
            backgroundColor: '#5469d4',color: '#fff',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
          }}
        >
          {processing ? 'Processing...' : `Pay ₹${amount / 100}`}
        </button>
      </form>

    </>
  );
};

export default StripeCheckoutForm;
