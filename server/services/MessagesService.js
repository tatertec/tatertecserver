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
  delete(id) {
    let data = dbContext.Message.findByIdAndDelete({ _id: id });
    if (!data) {
      throw new BadRequest("Invalid Id so we didn't know what to do");
    }
    return data;
  }
}

export const messageService = new MessageService();
