const { Router } = require("express");
const userRouter = Router();
const { User } = require("../models/User.js");

userRouter.post("/", async function (req, res) {
  try {
    const user = new User(req.body);
    await user.save();
    res.send({ user });
  } catch (error) {
    res.status(500), send({ error: error.message });
  }
});

userRouter.get("/", async function (req, res) {
  try {
    const user = await User.find({});
    res.send({ user });
  } catch (error) {
    res.status(500), send({ error: error.message });
  }
});

userRouter.get("/:userId", async function (req, res) {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    res.send({ user });
  } catch (error) {
    res.status(500), send({ error: error.message });
  }
});

userRouter.delete("/:userId", async function (req, res) {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndDelete(userId);
    res.send({ user });
  } catch (error) {
    res.status(500), send({ error: error.message });
  }
});

userRouter.put("/:userId", async function (req, res) {
  try {
    const { userId } = req.params;
    const { name, age, location } = req.body;
    const user = await User.findByIdAndUpdate(
      userId,
      { name, age, location },
      { new: true }
    );
    res.send({ user });
  } catch (error) {
    res.status(500), send({ error: error.message });
  }
});

module.exports = { userRouter };
