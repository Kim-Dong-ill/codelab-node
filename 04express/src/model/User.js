const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("user", userSchema);
module.exports = { User };
