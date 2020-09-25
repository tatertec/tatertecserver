const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
class TwilioService {
  sendNotification(profiles, requestBody) {
    const senderEmail = requestBody.senderEmail;
    const senderPhoneNumber = requestBody.senderPhoneNumber;
    const notification = {
      email: senderEmail,
      phoneNuber: senderPhoneNumber,
    };
    profiles.forEach((user) => {
      //if user has notifications on send a message
      if (true) {
        this.sendMessage(user, notification);
      }
    });
  }
  sendMessage(user, messageData) {
    client.messages
      .create({
        body:
          "New message from" + //16
          messageData.name + // 16 max...
          "Phone" + //5
          messageData.senderPhoneNumber + //11
          "https://tatertec.com", //20
        from: process.env.TWILIO_PHONE_NUMBER,
        to: user.phoneNumber,
      })
      .then((message) => console.log(message.sid));
  }
}
export const twilioService = new TwilioService();
