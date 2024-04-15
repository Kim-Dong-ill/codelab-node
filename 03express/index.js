const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const { User } = require("./src/model/User.js");
const dotenv = require("dotenv");
dotenv.config();

// const MON_URL =
//   "mongodb+srv://ehddlf289344:KNNxGy7M2DcDoKX4@mongodb.g8f7dmy.mongodb.net/test_tbl?retryWrites=true&w=majority&appName=MongoDB";

const server = async function () {
  await mongoose.connect(process.env.MON_URL);
  console.log("db connected");

  app.get("/user", async function (req, res) {
    const users = await User.find({});
    res.send({ users });
  });

  app.post("/user", async function (req, res) {
    const user = new User(req.body);
    await user.save();
    res.send({ user });
  });

  app.delete("/user/:userId", async function (req, res) {
    let { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);
    res.send({ user });
  });

  app.put("/user/:userId", async function (req, res) {
    let { userId } = req.params;
    let { age } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { age } },
      { new: true }
    );
    return res.send({ user });
  });

  app.listen(3000);
};

server();
