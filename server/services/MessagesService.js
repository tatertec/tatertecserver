import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class MessageService {
  async create(data) {
    let res = await dbContext.Message.create(data);
    return res;
  }
  find() {
    let data = dbContext.Message.find();
    if (!data) {
      throw new BadRequest("No data");
    }
    return data;
  }
  findById(id) {
    let data = dbContext.Message.find({ _id: id });
    if (!data) {
      throw new BadRequest("Invalid id");
    }
    return data;
  }
  edit(id, data) {
    let result = dbContext.Message.findOneAndUpdate({ _id: id }, data);
    if (!result) {
      throw new BadRequest("Invalid id");
    }
    return result;
  }
  delete(id) {
    let data = dbContext.Message.findByIdAndDelete({ _id: id });
    if (!data) {
      throw new BadRequest("Invalid Id");
    }
    return data;
  }
}

export const messageService = new MessageService();
