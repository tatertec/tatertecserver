import mongoose from "mongoose";
const Schema = mongoose.Schema;

const EmailClub = new Schema(
  {
    email: { type: String, reqired: true },
    siteId: { type: String, reqired: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default EmailClub;
