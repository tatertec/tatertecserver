import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Profile = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    //added manually to give access to modify website and get messages
    siteId: { type: String, default: null },
    phoneNumber: { type: String, default: null },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Profile;
