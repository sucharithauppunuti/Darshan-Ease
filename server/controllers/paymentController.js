const crypto = require('crypto');
const getRazorpayInstance = require('../config/razorpay');

// @desc    Create Razorpay Order
// @route   POST /api/payment/create-order
// @access  Private
exports.createOrder = async (req, res, next) => {
  try {
    const { amount, receipt } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount for payment order'
      });
    }

    const options = {
      amount: Math.round(Number(amount) * 100), // in paise
      currency: 'INR',
      receipt: receipt || `receipt_${Date.now()}`
    };

    let order;
    const razorpay = getRazorpayInstance();

    if (razorpay) {
      try {
        order = await razorpay.orders.create(options);
      } catch (err) {
        console.warn('Razorpay SDK order error, fallback to simulated order:', err.message);
      }
    }

    // Fallback simulation order if keys are demo or network fails
    if (!order) {
      order = {
        id: `order_sim_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        entity: 'order',
        amount: options.amount,
        amount_paid: 0,
        amount_due: options.amount,
        currency: 'INR',
        receipt: options.receipt,
        status: 'created',
        attempts: 0,
        created_at: Math.floor(Date.now() / 1000),
        isSimulation: true
      };
    }

    res.status(200).json({
      success: true,
      order,
      keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_DarshanEase123'
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Verify Razorpay payment signature
// @route   POST /api/payment/verify
// @access  Private
exports.verifyPayment = async (req, res, next) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id) {
      return res.status(400).json({
        success: false,
        message: 'Missing payment verification details'
      });
    }

    // If simulated order
    if (razorpay_order_id.startsWith('order_sim_') || !razorpay_signature) {
      return res.status(200).json({
        success: true,
        message: 'Payment verified successfully (Test Simulation)',
        paymentId: razorpay_payment_id || `pay_sim_${Date.now()}`
      });
    }

    // Real signature check
    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (secret) {
      const generated_signature = crypto
        .createHmac('sha256', secret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (generated_signature !== razorpay_signature) {
        return res.status(400).json({
          success: false,
          message: 'Payment verification failed: Invalid signature'
        });
      }
    }

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      paymentId: razorpay_payment_id
    });
  } catch (err) {
    next(err);
  }
};
