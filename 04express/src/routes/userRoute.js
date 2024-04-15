const { Router } = require("express");
const userRouter = Router();
const { User } = require("../model/User");

userRouter.get("", async function (req, res) {
  try {
    const user = await User.find({});
    res.send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

userRouter.post("", async function (req, res) {
  try {
    const user = new User(req.body);
    await user.save();
    return res.send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

userRouter.delete("/:userId", async function (req, res) {
  try {
    let { userId } = req.params;
    const user = await User.findByIdAndDelete({ _id: userId });
    res.send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

userRouter.put("/:userId", async function (req, res) {
  try {
    let { userId } = req.params;
    let { name, age } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { name, age } },
      { new: true }
    );
    return res.send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = { userRouter };
