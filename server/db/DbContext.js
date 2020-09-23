import mongoose from "mongoose";
import NoteSchema from "../models/Note";
import ProfileSchema from "../models/Profile";

class DbContext {
  Notes = mongoose.model("Note", NoteSchema);
  Profile = mongoose.model("Profile", ProfileSchema);
}

export const dbContext = new DbContext();
