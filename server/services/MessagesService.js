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

  findById(id) {
    let data = dbContext.Message.findById({ _id: id }).select("siteId");
    if (!data) {
      throw new BadRequest("Invalid id");
    }
    return data;
  }

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
      throw new BadRequest("Invalid Id so we didn't know what to do");
    }
    return data;
  }
}

export const messageService = new MessageService();
