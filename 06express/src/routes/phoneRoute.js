const { Router } = require("express");
const phoneRouter = Router();
const { Phone } = require("../models/Phone.js");

phoneRouter.get("/", async function (req, res) {
  try {
    const phone = await Phone.find({});
    res.send({ phone });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

phoneRouter.post("/", async function (req, res) {
  try {
    const phone = new Phone(req.body);
    await phone.save();
    res.send({ phone });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

phoneRouter.delete("/:userId", async function (req, res) {
  try {
    const { userId } = req.params;
    const phone = await Phone.findByIdAndDelete({ _id: userId });
    res.send({ phone });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

phoneRouter.put("/:userId", async function (req, res) {
  try {
    const { userId } = req.params;
    let { name, size } = req.body;
    const phone = await Phone.findByIdAndUpdate(
      userId,
      { $set: { name, size } },
      { new: true }
    );
    res.send({ phone });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = { phoneRouter };
