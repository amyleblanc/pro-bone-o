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

// client.conversations.conversations
//   .create({ friendlyName: "My First Conversation" })
//   .then((conversation) => console.log(conversation.sid));

// client.conversations
//   .conversations("CH87791643658b4de5bcdbd159be514662")
//   .fetch()
//   .then((conversation) => console.log(conversation.chatServiceSid));

// client.conversations
//   .conversations("CH87791643658b4de5bcdbd159be514662")
//   .participants.create({
//     "messagingBinding.address": "7787891864",
//     "messagingBinding.proxyAddress": "7655759138",
//   })
//   .then((participant) => console.log(participant.sid));

client.conversations
  .conversations("CH87791643658b4de5bcdbd159be514662")
  .participants.create({ identity: "testPineapple" })
  .then((participant) => console.log(participant.sid));

//IS4c9d3cbf7da2448198c14738e31ec054
//CH87791643658b4de5bcdbd159be514662
/*
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
*/

//module.exports = { sendMessage };

//console.log(sendMessage("7787891864", "Hello final testing!!"));
