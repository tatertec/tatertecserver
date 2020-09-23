import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class MessageService {
  async create(data) {
    let res = await dbContext.Message.create(data);
    if (!res) {
      throw new BadRequest("No data");
    }
    return res;
  }
  find(siteId) {
    let data = dbContext.Message.find({ siteId: siteId });
    if (!data) {
      throw new BadRequest("No data");
    }
    return data;
  }
  //NOTE Find by ID service--- commented out incase there needed
  // findById(id) {
  //   let data = dbContext.Message.find({ _id: id });
  //   if (!data) {
  //     throw new BadRequest("Invalid id");
  //   }
  //   return data;
  // }

  //NOTE  Edit service--- commented out incase there needed
  // edit(id, data) {
  //   let result = dbContext.Message.findOneAndUpdate({ _id: id }, data);
  //   if (!result) {
  //     throw new BadRequest("Invalid id");
  //   }
  //   return result;
  // }
  delete(id) {
    let data = dbContext.Message.findByIdAndDelete({ _id: id });
    if (!data) {
      throw new BadRequest("Invalid Id");
    }
    return "successfully deleted message";
  }
}

export const messageService = new MessageService();
