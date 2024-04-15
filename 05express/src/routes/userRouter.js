const { Router } = require("express");
const userRouter = Router();
const { User } = require("../models/User.js");

userRouter.get("", async function (req, res) {
  try {
    const user = await User.find({});
    return res.send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

//데이터 하나만 get하기
userRouter.get("/:userId", async function (req, res) {
  try {
    let { userId } = req.params;
    let user = await User.findOne({ _id: userId });
    return res.send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

userRouter.post("", async function (req, res) {
  try {
    const user = new User(req.body);
    await user.save();
    res.send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

userRouter.delete("/:userId", async function (req, res) {
  try {
    let { userId } = req.params;
    let user = await User.findByIdAndDelete({ _id: userId });
    return res.send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

userRouter.put("/:userId", async function (req, res) {
  try {
    let { userId } = req.params;
    let {
      age,
      email,
      name: { first, last },
    } = req.body;
    let user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          age,
          email,
          name: {
            first,
            last,
          },
        },
      },
      { new: true }
    );
    return res.send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = { userRouter };
