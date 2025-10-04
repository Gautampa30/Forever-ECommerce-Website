const express = require('express');
const router = express.Router();
const { handleWebhook } = require('../controllers/paymentController');

// Stripe webhooks require raw body, NOT express.json()
router.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

module.exports = router;
