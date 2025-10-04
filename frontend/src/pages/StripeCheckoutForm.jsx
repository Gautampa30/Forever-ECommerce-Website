import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const StripeCheckoutForm = ({ clientSecret, amount, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: cardElement },
    });

    setProcessing(false);

    if (error) {
      onError(error.message);
    } else if (paymentIntent.status === "succeeded") {
      onSuccess(paymentIntent);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement options={{ hidePostalCode: true }} />
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full py-2 bg-black text-white rounded disabled:opacity-60"
      >
        {processing ? "Processing..." : `Pay ₹${(amount / 100).toFixed(2)}`}
      </button>
    </form>
  );
};

export default StripeCheckoutForm;
