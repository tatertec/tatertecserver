import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0provider";
import { messageService } from "../services/MessagesService";

export class NotesController extends BaseController {
  constructor() {
    super("api/notes");
    this.router
      .post("", this.create)
      .use(auth0Provider.getAuthorizedUserInfo)
      .get("", this.find)
      .get("/:id", this.findById)
      .put("/:id", this.edit)
      .delete("/:id", this.delete);
  }
  async create(req, res, next) {
    try {
      let data = await messageService.create(req.body);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async find(req, res, next) {
    try {
      let data = await messageService.find();
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async findById(req, res, next) {
    try {
      let data = await messageService.findById(req.params.id);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      let data = await messageService.edit(req.params.id, req.body);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      let data = await messageService.delete(req.params.id);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
}
