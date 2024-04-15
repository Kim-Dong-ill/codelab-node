const mongoose = require("mongoose");

const ImageSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    images: [
      {
        originalname: { type: String },
        filename: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Image = mongoose.model("image", ImageSchema);

module.exports = { Image };
