const dotenv = require("dotenv").config();
const twilio = require("twilio")(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendSMS = async () => {
  console.log();
  // const client = new twilio(
  //   process.env.TWILIO_SID,
  //   process.env.TWILIO_AUTH_TOKEN
  // );
  return twilio.messages
    .create({
      body: "hey this is a message",
      from: "+94760243383",
      to: process.env.PHONE_NUMBER,
    })
    .then((message) => console.log(message, "message sent"))
    .catch((error) => console.error(error, "message not sent"));
};

sendSMS();
