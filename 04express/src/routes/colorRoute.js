const { Router } = require("express");
const colorRouter = Router();
const { Color } = require("../model/Color.js");

colorRouter.get("/", async function (req, res) {
  const color = await Color.find({});
  res.send({ color });
});

colorRouter.post("/", async function (req, res) {
  const color = new Color(req.body);
  await color.save();
  res.send({ color: color });
});

colorRouter.delete("/:userId", async function (req, res) {
  let { userId } = req.params;
  const color = await Color.findByIdAndDelete({ _id: userId });
  res.send({ color });
});

colorRouter.put("/:userId", async function (req, res) {
  let { userId } = req.params;
  let { name, index, like } = req.body;
  const color = await Color.findByIdAndUpdate(
    userId,
    { $set: { name, index, like } },
    { new: true }
  );
  res.send({ color });
});

module.exports = { colorRouter };
