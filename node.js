const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const app = express();
const port = 3000;

// Twilio credentials (you can get these from your Twilio console)
const accountSid = 'your_account_sid';
const authToken = 'your_auth_token';
const client = twilio(accountSid, authToken);

app.use(bodyParser.json());

// Store verification codes (this can be in a database, for simplicity we use a simple object)
const verificationCodes = {};

// Endpoint to request a verification code
app.post('/send-code', (req, res) => {
  const { phoneNumber } = req.body;
  const verificationCode = Math.floor(100000 + Math.random() * 900000);  // Random 6-digit code

  // Store the code temporarily (in a production app, this should be stored securely)
  verificationCodes[phoneNumber] = verificationCode;

  // Send the verification code via SMS using Twilio
  client.messages.create({
    body: `Your verification code is: ${verificationCode}`,
    to: phoneNumber,  // User's phone number
    from: '+91 8252360613'  // Your Twilio phone number
  })
  .then((message) => {
    console.log('Verification code sent:', message.sid);
    res.status(200).json({ message: 'Verification code sent!' });
  })
  .catch((error) => {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send verification code' });
  });
});

// Endpoint to verify the code
app.post('/verify-code', (req, res) => {
  const { phoneNumber, code } = req.body;

  // Check if the entered code matches the stored code
  if (verificationCodes[phoneNumber] && verificationCodes[phoneNumber] == code) {
    delete verificationCodes[phoneNumber];  // Clear the code after verification
    res.status(200).json({ message: 'Phone number verified successfully' });
  } else {
    res.status(400).json({ error: 'Invalid verification code' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
