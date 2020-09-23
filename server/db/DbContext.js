import mongoose from "mongoose";
import NoteSchema from "../models/Note";
import ProfileSchema from "../models/Profile";
import MessageSchema from "..//models/Message";

class DbContext {
  Notes = mongoose.model("Note", NoteSchema);
  Message = mongoose.model("Message", MessageSchema);
  Profile = mongoose.model("Profile", ProfileSchema);
}

export const dbContext = new DbContext();
