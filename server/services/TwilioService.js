const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
class TwilioService {
  sendNotification(profiles, requestBody) {
    const senderPhoneNumber = requestBody.senderPhoneNumber;
    const senderName = requestBody.senderName;
    profiles.forEach((user) => {
      //if user has notifications on send a message
      if (true) {
        this.sendMessage(user, senderName, senderPhoneNumber);
      }
    });
  }
  sendMessage(user, senderName, senderPhoneNumber) {
    client.messages
      .create({
        body:
          //NOTE body should not be more than 75 characters
          "New message from " + //17
          senderName + // 16 max...
          " Phone " + //7
          senderPhoneNumber + //11
          " https://tatertec.com", //20
        from: process.env.TWILIO_PHONE_NUMBER,
        to: user.phoneNumber,
      })
      .then((message) => console.log(message.sid));
  }
}
export const twilioService = new TwilioService();
