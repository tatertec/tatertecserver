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
      // .get("/:id", this.findById)
      // .put("/:id", this.edit)
      .delete("/:id", this.delete);
  }

  async create(req, res, next) {
    const origin = req.headers.origin;
    req.body.siteId = origin;
    try {
      let data = await messageService.create(req.body);

      const profiles = await profilesService.getProfileBySiteId(origin);
      profiles.forEach((person) => {
        // @ts-ignore
        if (person.phoneNumber) {
          // @ts-ignore
          twilioService.sendNotification(person.phoneNumber);
        }
      });

      res.send(data);
    } catch (error) {
      next(error);
    }
  }
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
  //NOTE Find by ID route--- commented out incase there needed
  // async findById(req, res, next) {
  //   const siteId = profilesService.getSiteId();
  //   try {
  //     let data = await messageService.findById(req.params.id);
  //     res.send(data);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  //NOTE  Edit route--- commented out incase there needed
  // async edit(req, res, next) {
  //   const siteId = profilesService.getSiteId();
  //   try {
  //     let data = await messageService.edit(req.params.id, req.body);
  //     res.send(data);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
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
