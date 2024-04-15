const { Router } = require("express");
const userRouter = Router();
const { User } = require("../model/User");

const { hash, compare } = require("bcryptjs");

//회원가입역할
userRouter.post("/", async function (req, res) {
  try {
    const password = await hash(req.body.password, 10);
    console.log("패스워드 :" + password);

    const user = new User({ ...req.body, password });
    await user.save();
    return res.send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

//로그인 역할
userRouter.post("/login", async function (req, res) {
  try {
    const { username, password } = req.body; //로그인창에서 정보 얻음

    const user = await User.findOne({ username: username }); //유저 네임으로 회원 정보 가져옴
    const isvalid = await compare(password, user.password); //로그인창의 비번이랑 회원정보 비번이랑 같은지 확인
    console.log("로그인 :" + isvalid);
    if (!isvalid) {
      console.log("정보 맞지 않음");
      res.send({ message: "정보 맞지 않음" });
    } else {
      console.log("로그인 성공!!");
      res.send({ message: "로그인 성공!!", ID: user.username });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

userRouter.get("/", async function (req, res) {
  try {
    const user = await User.find();
    return res.send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

//단일 get
userRouter.get("/:userId", async function (req, res) {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    return res.send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

userRouter.delete("/:userId", async function (req, res) {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);
    return res.send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

userRouter.put("/:userId", async function (req, res) {
  try {
    const { userId } = req.params;
    const { username, age, password } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { username, age, password } },
      { new: true }
    );
    return res.send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = { userRouter };
