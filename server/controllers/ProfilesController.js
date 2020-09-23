import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0provider";
import { profilesService } from "../services/ProfilesService";
import { BadRequest } from "../utils/Errors";

export class ProfilesController extends BaseController {
  constructor() {
    super("api/profile");
    this.router
      .use(auth0Provider.getAuthorizedUserInfo)
      .get("", this.getUserProfile)
      .put("/:id", this.edit);
  }
  async getUserProfile(req, res, next) {
    try {
      let profile = await profilesService.getProfile(req.userInfo);
      res.send(profile);
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      if (req.body.siteId) {
        throw new BadRequest(
          "You can't add edit or delete siteId. Contact concrete digital for help or remove the siteId attribute from the body of your request."
        );
      }
      req.body.creatorId = req.user.sub;
      res.send(req.body);
    } catch (error) {
      next(error);
    }
  }
}
