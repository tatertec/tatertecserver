import BaseController from "../utils/BaseController";
// @ts-ignore
import auth0Provider from "@bcwdev/auth0provider";
import { messageService } from "../services/MessagesService";
import { profilesService } from "../services/ProfilesService";
import { twilioService } from "../services/TwilioService";
export class MessagesController extends BaseController {
  constructor() {
    super("api/messages");
    this.router
      .post("", this.create)
      .use(auth0Provider.getAuthorizedUserInfo)
      .get("", this.find)
      .delete("/:id", this.delete);
  }

  async create(req, res, next) {
    //get the siteId and append it to the body
    const origin = req.headers.origin;
    req.body.siteId = origin;
    try {
      //create the message in the database with siteId being where it came from
      let data = await messageService.create(req.body);

      //get profiles that match siteId this is entered manually by a tatertec admin
      //select is used to select name and phone add more to select for more data
      const profiles = await profilesService.getProfileBySiteId(origin);
      //pass the profiles to notificationService
      twilioService.sendNotification(profiles, req.body);

      res.send(data);
    } catch (error) {
      next(error);
    }
  }

  // Note old func delete me...
  // profiles.forEach((person) => {
  //   // @ts-ignore
  //   if (person.phoneNumber) {
  //     // @ts-ignore
  //     twilioService.sendNotification(person.phoneNumber);
  //   }

  async find(req, res, next) {
    const email = req.userInfo.email;
    const siteId = await profilesService.getSiteId(email);
    try {
      let data = await messageService.find(siteId);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    const email = req.userInfo.email;
    const siteId = await profilesService.getSiteId(email);
    let message = await messageService.findById(req.params.id);
    // @ts-ignore
    console.log(siteId === message.siteId);

    // @ts-ignore
    if (siteId === message.siteId) {
      try {
        let data = await messageService.delete(req.params.id);
        res.send(data);
      } catch (error) {
        next(error);
      }
    }
  }
}
