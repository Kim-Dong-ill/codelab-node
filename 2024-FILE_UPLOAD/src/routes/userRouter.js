const { upload } = require("../middlewares/imageUpload");
const { User } = require("../models/User");
const { Router } = require("express");
const userRouter = Router();

//암호화를 위해서 가져옴 compare는 암호비교를 위함
const { hash, compare } = require("bcryptjs");

//회원가입 같은 역할
userRouter.post("/", async function (req, res) {
  try {
    const password = await hash(req.body.password, 10);
    console.log("패스워드 : " + password); //암호화된 패스워드가 나온다.

    const user = new User({ ...req.body, password: password });
    //body를 복사해서 password에 password를 넣는다.
    await user.save();
    return res.send({ user });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

//로그인의 역할
userRouter.post("/login", async function (req, res) {
  try {
    console.log(req.body);
    const user = await User.findOne({ useremail: req.body.useremail });
    //body에 입력한 (로그인창) 이메일을 User(회원가입정보)에서 찾는다.
    const isValid = await compare(req.body.password, user.password);
    //너가 바디(로그인창)에 입력한 패쓰워드랑 User에 있는 패쓰워드랑 비교한다.
    console.log("isValid :" + isValid); //true or false 로 나옴
    if (!isValid) {
      //false이면
      return res
        .status(400)
        .send({ error: "입력하신 정보가 올바르지 않습니다." });
    }
    res.send({ message: "로그인 되셨습니다.", email: user.useremail });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

userRouter.put(
  "/reg_modi/:userId",
  upload.single("avatar"),
  async function (req, res) {
    try {
      console.log(req.file);

      const { userId } = req.params;
      console.log("userId : " + userId);

      const { username } = req.body; //사진 넣을때 이름도 변경
      const { filename, originalname } = req.file;
      const image = { filename, originalname };
      console.log(image);

      const update = await User.findOneAndUpdate(
        { _id: userId },
        { $set: { username, image } },
        { new: true }
      );

      // const update = await User.findByIdAndUpdate(
      //   userId,
      //   { image },
      //   { new: true }
      // );

      return res.send({ update });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }
);

//개별 아이디 get
userRouter.get("/member/:userId", async function (req, res) {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    return res.send({ user });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

userRouter.get("/member", async function (req, res) {
  try {
    const user = await User.find();
    return res.send({ user });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = { userRouter };
