const { default: mongoose } = require("mongoose");

const ImageSchema = mongoose.Schema({});
const Image = mongoose.model("image", ImageSchema);

module.exports = { Image };
