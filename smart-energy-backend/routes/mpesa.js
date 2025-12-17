const express = require('express');
const router = express.Router();
const axios = require('axios');
const moment = require('moment');

// Get M-Pesa Access Token
async function getAccessToken() {
  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString('base64');

  try {
    const response = await axios.get(process.env.MPESA_OAUTH_URL, {
      headers: {
        Authorization: `Basic ${auth}`
      }
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error.response?.data || error.message);
    throw new Error('Failed to get M-Pesa access token');
  }
}

// Generate Password for STK Push
function generatePassword() {
  const shortcode = process.env.MPESA_SHORTCODE;
  const passkey = process.env.MPESA_PASSKEY;
  const timestamp = moment().format('YYYYMMDDHHmmss');
  
  const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');
  
  return { password, timestamp };
}

// STK Push Endpoint
router.post('/stk-push', async (req, res) => {
  const { phone, amount } = req.body;

  // Validate input
  if (!phone || !amount) {
    return res.status(400).json({
      success: false,
      message: 'Phone number and amount are required'
    });
  }

  // Format phone number (remove leading 0 if present, add 254)
  let formattedPhone = phone.toString().replace(/^0+/, '');
  if (!formattedPhone.startsWith('254')) {
    formattedPhone = '254' + formattedPhone;
  }

  try {
    // Get access token
    const accessToken = await getAccessToken();
    
    // Generate password and timestamp
    const { password, timestamp } = generatePassword();

    // STK Push payload
    const stkPushPayload = {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.round(amount),
      PartyA: formattedPhone,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: formattedPhone,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: 'SmartEnergy',
      TransactionDesc: 'Energy Credit Top-Up'
    };

    console.log('📱 Sending STK Push to:', formattedPhone);
    console.log('💰 Amount:', amount);

    // Send STK Push request
    const response = await axios.post(
      process.env.MPESA_STK_URL,
      stkPushPayload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('✅ STK Push Response:', response.data);

    // Return success response
    res.json({
      success: true,
      message: 'STK Push sent successfully. Check your phone.',
      data: {
        MerchantRequestID: response.data.MerchantRequestID,
        CheckoutRequestID: response.data.CheckoutRequestID,
        ResponseCode: response.data.ResponseCode,
        ResponseDescription: response.data.ResponseDescription,
        CustomerMessage: response.data.CustomerMessage
      }
    });

  } catch (error) {
    console.error('❌ STK Push Error:', error.response?.data || error.message);
    
    res.status(500).json({
      success: false,
      message: 'Failed to initiate payment',
      error: error.response?.data || error.message
    });
  }
});

// M-Pesa Callback Endpoint
router.post('/callback', (req, res) => {
  console.log('📥 M-Pesa Callback Received:');
  console.log(JSON.stringify(req.body, null, 2));

  const { Body } = req.body;

  if (Body.stkCallback) {
    const { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc } = Body.stkCallback;

    if (ResultCode === 0) {
      // Payment successful
      console.log('✅ Payment Successful!');
      console.log('Transaction ID:', MerchantRequestID);
      
      // Here you would:
      // 1. Update user's balance in database
      // 2. Send confirmation SMS/email
      // 3. Log transaction
    } else {
      // Payment failed
      console.log('❌ Payment Failed:', ResultDesc);
    }
  }

  // Always respond with 200 to acknowledge receipt
  res.json({ ResultCode: 0, ResultDesc: 'Accepted' });
});

// Query STK Push Status
router.post('/query-status', async (req, res) => {
  const { checkoutRequestID } = req.body;

  if (!checkoutRequestID) {
    return res.status(400).json({
      success: false,
      message: 'CheckoutRequestID is required'
    });
  }

  try {
    const accessToken = await getAccessToken();
    const { password, timestamp } = generatePassword();

    const queryPayload = {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestID
    };

    const response = await axios.post(
      'https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query',
      queryPayload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error('Query Status Error:', error.response?.data || error.message);
    
    res.status(500).json({
      success: false,
      message: 'Failed to query transaction status',
      error: error.response?.data || error.message
    });
  }
});

module.exports = router;