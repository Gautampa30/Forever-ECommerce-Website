const stripe = require("../config/stripe");
const sendEmail = require("../utils/emailService");
const Order = require("../models/Order");
const User = require("../models/User"); // if needed for email/user lookup
const Cart = require("../models/cart");

exports.createPaymentIntent = async (req, res) => {
  const { amount, receiptEmail, userId, cart } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "inr",
      receipt_email: receiptEmail,
      payment_method_types: ["card"],
      metadata: {
        userId: userId.toString(),
        cart: JSON.stringify(cart),  // Pass cart items to webhook for order saving
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: error.message });
  }
};


// Webhook to listen to Stripe events (payment success/failure)
exports.handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
        console.log("Webhook received:", event.type);

  } catch (err) {
    console.log("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    console.log("Inside second try block, event:", event.type);
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      const userId = paymentIntent.metadata ? paymentIntent.metadata.userId : null;
      const cartMetaString = paymentIntent.metadata ? paymentIntent.metadata.cart : null;
let cart;
try {
  cart = cartMetaString ? JSON.parse(cartMetaString) : [];
} catch (parseErr) {
  console.error("Error parsing cart metadata:", cartMetaString, parseErr);
  cart = [];
}

console.log("Parsed metadata userId:", userId);
console.log("Parsed metadata cart:", cart);


      if (!userId || !Array.isArray(cart) || cart.length === 0) {
  console.log("User ID or Cart missing/empty in PaymentIntent metadata", userId, cart);
  return res.status(400).send("Missing userId or cart metadata");
}

      
      // Save order to DB
      const order = new Order({
        user: userId,
        items: cart.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: paymentIntent.amount,
        status: "processing",
        paymentIntentId: paymentIntent.id,
      });

      await order.save();
            console.log(`Order saved for user ${userId}`);
            console.log('Order saved:', order);

         // Optional: Clear cart here or elsewhere
      await Cart.findOneAndUpdate({ user: userId }, { $set: { items: [] } });    


// Find correct recipient email to send payment confirmation
let recipientEmail = paymentIntent.receipt_email;
if (!recipientEmail && userId) {
  try {
    const user = await User.findById(userId).select("email");
    if (user && user.email) recipientEmail = user.email;
  } catch (err) {
    console.error("Could not fetch user email for payment:", userId, err);
  }
}
console.log("Sending payment email to:", recipientEmail);

// Format amount for email (from paise to INR)
      const paidAmount = paymentIntent.amount ? (paymentIntent.amount/100).toFixed(2) : 'N/A';
// Send success email
      if (recipientEmail) {
        await sendEmail(
          recipientEmail,
          "Payment Successful",
          `Your payment was successful for ₹${paidAmount}. Thank you for your order!`
        );
}

    }

    else if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object;
      // Try to get email from intent or DB (if possible)
      let recipientEmail = paymentIntent.receipt_email;
      const userId = paymentIntent.metadata ? paymentIntent.metadata.userId : null;
      if (!recipientEmail && userId) {
        try {
          const user = await User.findById(userId).select("email");
          if (user && user.email) recipientEmail = user.email;
        } catch (err) {
          console.error("Could not fetch user email for failed payment:", userId, err);
        }
      }
      const paidAmount = paymentIntent.amount ? (paymentIntent.amount/100).toFixed(2) : 'N/A';

      if (recipientEmail) {
        await sendEmail(
          recipientEmail,
          "Payment Failed",
          `Your payment of ₹${paidAmount} failed. Please try again.`
        );
      }
    }
  } catch (error) {
    console.error("Error in webhook handler:", error);
    return res.status(500).send("Webhook handler error");
  }

  res.json({ received: true });
};

// Example Express handler in your cart controller


