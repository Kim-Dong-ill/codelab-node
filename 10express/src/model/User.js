const { default: mongoose } = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: { type: String, required: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    role: { type: Number, required: true, default: 0 },
    image: {
      filename: { type: String, default: "noimage.jpg" },
      originalname: { type: String, default: "noimage.jpg" },
    },
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("user", UserSchema);

module.exports = { User };
