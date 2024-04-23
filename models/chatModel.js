const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    members: Array,
    notifications: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Notification",
        required: false,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
