const express = require('express');
const { getStripeKey, createPayment } = require('../controllers/paymentController');
const { isAuthenticatedUser } = require('../middlewares/auth');
const router = express.Router();

router.get("/payment/getApiKey", isAuthenticatedUser, getStripeKey);
router.post("/payment/process", isAuthenticatedUser, createPayment);

module.exports = router;
