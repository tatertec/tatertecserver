import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class NotesService {
  async create(data) {
    let res = await dbContext.Notes.create(data);
    return res;
  }
  find() {
    let data = dbContext.Notes.find();
    if (!data) {
      throw new BadRequest("No data");
    }
    return data;
  }
  findById(id) {
    let data = dbContext.Notes.find({ _id: id });
    if (!data) {
      throw new BadRequest("Invalid id");
    }
    return data;
  }
  edit(id, data) {
    let result = dbContext.Notes.findOneAndUpdate({ _id: id }, data);
    if (!result) {
      throw new BadRequest("Invalid id");
    }
    return result;
  }
  delete(id) {
    let data = dbContext.Notes.findByIdAndDelete({ _id: id });
    if (!data) {
      throw new BadRequest("Invalid Id");
    }
    return data;
  }
}

export const notesService = new NotesService();
