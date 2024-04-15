const { default: mongoose } = require("mongoose");

const ImageSchema = mongoose.Schema({
  images: [
    {
      filename: { type: String },
      originalname: { type: String },
    },
  ],
});
const Image = mongoose.model("image", ImageSchema);

module.exports = { Image };
