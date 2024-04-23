const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    chatId: { type: String, required: true },
    senderId: { type: String, required: true },
    isRead: { type: Boolean, required: true, default: false },
    date: { type: String, required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
