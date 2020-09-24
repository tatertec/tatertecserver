import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: "https://concretedigitalserver.herokuapp.com",
});

class MailChimpService {
  async ping() {
    const response = await mailchimp.ping.get();
    console.log(response);
    return response;
  }
}

export const mailChimpService = new MailChimpService();
