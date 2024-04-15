const express = require("express");
const { default: mongoose } = require("mongoose");
const { imageRouter } = require("./src/routes/imageRouter");
const { userRouter } = require("./src/routes/userRouter");
const app = express();
app.use(express.json());

const MON_URL =
  "mongodb+srv://ehddlf289344:KNNxGy7M2DcDoKX4@mongodb.g8f7dmy.mongodb.net/test_tbl?retryWrites=true&w=majority&appName=MongoDB";
const server = async function () {
  await mongoose.connect(MON_URL);
  console.log("db connected");

  //imageRouter
  app.use("/imageupload", imageRouter);

  //userRouter
  app.use("/user", userRouter);

  app.listen(3000);
};
server();
