const express = require("express");
const { default: mongoose, Mongoose } = require("mongoose");
const { imageRouter } = require("./src/routes/imageRouter");
const app = express();
app.use(express.json());

const MON_URL =
  "mongodb+srv://ehddlf289344:KNNxGy7M2DcDoKX4@mongodb.g8f7dmy.mongodb.net/11express?retryWrites=true&w=majority&appName=MongoDB";

const server = async function () {
  mongoose.connect(MON_URL);
  console.log("db connected");

  //imageRouter
  app.use("/upload", imageRouter);

  app.listen(3000);
};

server();
