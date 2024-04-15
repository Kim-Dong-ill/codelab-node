const { Schema, model, Types } = require("mongoose");

const phoneSchema = new Schema(
  {
    phoneName: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);
const Phone = model("phone", phoneSchema);
module.exports = { Phone };
