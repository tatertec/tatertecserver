import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0provider";
import { notesService } from "../services/NotesService";

export class NotesController extends BaseController {
  constructor() {
    super("api/notes");
    this.router
      .use(auth0Provider.getAuthorizedUserInfo)
      .get("", this.find)
      .get("/:id", this.findById)
      .put("/:id", this.edit)
      .post("", this.create)
      .delete("/:id", this.delete);
  }
  async create(req, res, next) {
    try {
      let data = await notesService.create(req.body);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async find(req, res, next) {
    try {
      let data = await notesService.find();
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async findById(req, res, next) {
    try {
      let data = await notesService.findById(req.params.id);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      let data = await notesService.edit(req.params.id, req.body);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      let data = await notesService.delete(req.params.id);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
}
