const { default: mongoose } = require("mongoose");

const ImageSchema = mongoose.Schema({
  image: [{ filename: { type: String }, originalname: { type: String } }],
});
const Image = mongoose.model("image", ImageSchema);

module.exports = { Image };
