const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      maxlength: 100,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 1024,
    },
    image: {
      type: mongoose.Types.ObjectId,
      ref: "Image",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
