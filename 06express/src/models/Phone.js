const { default: mongoose } = require("mongoose");

const phoneShema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Phone = mongoose.model("phone", phoneShema);

module.exports = { Phone };
