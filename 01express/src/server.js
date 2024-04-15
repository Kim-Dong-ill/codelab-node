const express = require("express");
const app = express();
const users = [];
const mongoose = require("mongoose");
const { User } = require("./model/User.js");

const dotenv = require("dotenv");
dotenv.config();
//process.env.URL

// const MONGO_URL =
//   "mongodb+srv://ehddlf289344:KNNxGy7M2DcDoKX4@mongodb.g8f7dmy.mongodb.net/book?retryWrites=true&w=majority&appName=MongoDB";

// let result = mongoose.connect(MONGO_URL);
// console.log(result);

// mongoose.connect(MONGO_URL).then(function (result) {
//   return console.log(result);
// });

// const fn = async function(){

// }

const server = async function () {
  try {
    await mongoose.connect(process.env.MONGO_URL); //promise
    console.log("db connected");
    app.use(express.json());

    app.get("/user", async function (req, res) {
      try {
        const users = await User.find({});
        return res.send({ users });
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }

      // return res.send({ user: users });
    });

    app.post("/user", async function (req, res) {
      // 01
      // users.push({
      //   name: req.body.name, //바디에 있는 name을 req(요청)한다.
      //   name: req.body.age, //바디에 있는 age을 req(요청)한다.
      // });
      // return res.send({ success: true }); //post에 성공할떄 나오는 메세지

      // 02
      // let username = req.body.username
      // let name = req.body.name
      let { username, name } = req.body;

      try {
        if (!username) {
          return res.status(400).send({ error: "이름이 없습니다." });
        }
        if (!name || !name.first || !name.last) {
          return res.status(400).send({ error: "성/이름이 없습니다." });
        }

        const user = new User(req.body);
        await user.save();
        res.send({ user });
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }
    });

    app.delete("/user/:userId", async function (req, res) {
      try {
        let { userId } = req.params;
        if (!mongoose.isValidObjectId(userId)) {
          //db에 params에 들어간 아이디가 있는지 체크
          return res.status(400).send({ error: "유저ID가 없습니다." });
        }

        // let userId = req.params.userId;

        const user = await User.findByIdAndDelete({ _id: userId });
        return res.send({ user });
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }
    });

    app.put("/user/:userId", async function (req, res) {
      try {
        let { userId } = req.params;
        if (!mongoose.isValidObjectId(userId)) {
          //db에 params에 들어간 아이디가 있는지 체크
          return res.status(400).send({ error: "유저ID가 없습니다." });
        }

        let { age } = req.body;
        //age value 확인
        if (!age) {
          return res.status(400).send({ error: "나이가 없습니다." });
        }
        if (typeof age !== "number") {
          return res.status(400).send({ error: "숫자 입력 하세요." });
        }

        const user = await User.findByIdAndUpdate(
          userId,
          { $set: { age } },
          { new: true } //업데이트 할때 화면에서 바로 반영(원래는 두번 눌러야 반영된다)
        );
        return res.send({ user });
      } catch (error) {
        return res.status(500).send({ error: error.message });
      }
    });

    app.listen(3000);
  } catch (error) {
    console.log("err");
  }
};

server();
