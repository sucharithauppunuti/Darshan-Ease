const Razorpay = require('razorpay');

function getRazorpayInstance() {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_id || !key_secret || key_id.includes('your_')) {
    return null;
  }
  try {
    return new Razorpay({ key_id, key_secret });
  } catch (err) {
    console.warn('⚠️ Razorpay initialization warning:', err.message);
    return null;
  }
}

module.exports = getRazorpayInstance;
