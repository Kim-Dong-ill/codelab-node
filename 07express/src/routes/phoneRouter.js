const { Router } = require("express");
const phoneRouter = Router();
const { Phone } = require("../models/Phone.js");
const { User } = require("../models/User.js");

phoneRouter.post("/", async function (req, res) {
  try {
    const { phoneName, price, userId } = req.body;
    console.log(userId);
    let user = await User.findById(userId);
    if (!user) {
      return res.status(400).send({ error: "user가 없습니다." });
    }
    let phone = new Phone({ ...req.body, user });
    await phone.save();
    return res.send({ phone });
  } catch (error) {
    res.status(500), send({ error: error.message });
  }
});

phoneRouter.get("/", async function (req, res) {
  try {
    const phone = await Phone.find({});
    res.send({ phone });
  } catch (error) {
    res.status(500), send({ error: error.message });
  }
});

//핸드폰id로 단일 get
phoneRouter.get("/:phoneId", async function (req, res) {
  try {
    const { phoneId } = req.params;
    const phone = await Phone.findById(phoneId);
    return res.send({ phone });
  } catch (error) {
    res.status(500), send({ error: error.message });
  }
});

phoneRouter.delete("/:phoneId", async function (req, res) {
  try {
    const { phoneId } = req.params;
    const phone = await Phone.findByIdAndDelete(phoneId);
    return res.send({ phone });
  } catch (error) {
    res.status(500), send({ error: error.message });
  }
});

phoneRouter.put("/:phoneId", async function (req, res) {
  try {
    const { phoneId } = req.params;
    const { phoneName, price } = req.body;
    const phone = await Phone.findByIdAndUpdate(
      phoneId,
      { phoneName, price },
      { new: true }
    );
    return res.send({ phone });
  } catch (error) {
    res.status(500), send({ error: error.message });
  }
});

module.exports = { phoneRouter };
