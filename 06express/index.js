const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
app.use(express.json());

const dotenv = require("dotenv");
const { phoneRouter } = require("./src/routes/phoneRoute.js");
dotenv.config();

const server = async function () {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("db connected!!");
    mongoose.set("debug", true);

    app.use("/phone", phoneRouter);

    // app.use("/blog", blogRouter);

    app.listen(3000);
  } catch (error) {
    console.log("error");
  }
};

server();
