const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
class TwilioService {
  async sendNotification(phoneNumber) {
    client.messages
      .create({
        body: "you have a new message.",
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber,
      })
      .then((message) => console.log(message.sid));
  }
}
export const twilioService = new TwilioService();
