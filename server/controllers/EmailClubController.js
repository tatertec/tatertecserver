import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0provider";
import { messageService } from "../services/MessagesService";
import { profilesService } from "../services/ProfilesService";
import { mailChimpService } from "../services/MailChimpService";
export class MessagesController extends BaseController {
  constructor() {
    super("api/subscribe");
    this.router
      .get("/ping", this.ping)
      .use(auth0Provider.getAuthorizedUserInfo);
    // .get("", this.find)
    //NOTE i left the getbyid and edit routes commented out incase there needed
    // .get("/:id", this.findById)
    // .put("/:id", this.edit)
    // .delete("/:id", this.delete);
  }

  async ping(req, res, next) {
    try {
      let data = await mailChimpService.ping();
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  // async find(req, res, next) {
  //   const email = req.userInfo.email;
  //   const siteId = await profilesService.getSiteId(email);
  //   try {
  //     let data = await messageService.find(siteId);
  //     res.send(data);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
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
  // async delete(req, res, next) {
  //   const email = req.userInfo.email;
  //   const siteId = await profilesService.getSiteId(email);
  //   let message = await messageService.findById(req.params.id);
  //   // @ts-ignore
  //   console.log(siteId === message.siteId);

  //   // @ts-ignore
  //   if (siteId === message.siteId) {
  //     try {
  //       let data = await messageService.delete(req.params.id);
  //       res.send(data);
  //     } catch (error) {
  //       next(error);
  //     }
  // }
  // }
}
