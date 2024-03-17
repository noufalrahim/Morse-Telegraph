import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema(
  {
    senderId: String,
    receiverId: String,
    message: String,
  },
  {
    timestamps: true,
  }
);

const Messages = mongoose.model("Messages", messagesSchema);
export default Messages;
