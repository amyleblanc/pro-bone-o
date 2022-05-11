// load .env data into process.env
const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

twilioParams = {
  accountID: process.env.accountID,
  authToken: process.env.authToken,
  messagingID: process.env.messagingID,
};

const twilio = require("twilio");
const client = new twilio(twilioParams.accountID, twilioParams.authToken);

// provides function to send a message to a single phone number in one direction only

const sendMessage = function (phoneNumber, message) {
  return client.messages
    .create({
      body: message,
      messagingServiceSid: twilioParams.messagingID,
      to: `${phoneNumber}`,
    })
    .then((message) => console.log(message.sid))
    .catch((err) => {
      console.log(err.message);
      return null;
    })
    .done();
};

module.exports = { sendMessage };

//console.log(sendMessage("5555555555", "Hello final testing!!"));
