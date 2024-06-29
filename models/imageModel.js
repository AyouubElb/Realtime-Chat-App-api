const mongoose = require("mongoose");

const imageSchema = mongoose.Schema(
  {
    file: {
      type: String,
      required: true,
    },
    cloudinary_id: {
      type: String,
      required: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Image", imageSchema);
