import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Message = new Schema(
  {
    senderName: { type: String, reqired: true },
    senderEmail: { type: String, reqired: true },
    senderPhoneNumber: { type: String },
    body: { type: String, required: true },

    siteId: { type: String, reqired: true },
    reciverPhoneNumber: { type: String, reqired: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Message;
