import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Note = new Schema(
  {
    description: { type: String, required: true },
    bugId: { type: String, reqired: true },
    creatorEmail: { type: String, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Note.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true,
});

export default Note;
