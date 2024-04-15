const express = require("express");
const app = express();
app.use(express.json());
const { User } = require("./src/model/User.js");

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { colorRouter } = require("./src/routes/colorRoute");
const { userRouter } = require("./src/routes/userRoute.js");
dotenv.config();
const server = async function () {
  mongoose.connect(process.env.MON_URL);
  console.log("db connected");

  app.use("/color", colorRouter);

  app.use("/user", userRouter);

  app.listen(3000);
};

server();
