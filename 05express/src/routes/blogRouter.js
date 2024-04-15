const { Router } = require("express");
const { default: mongoose } = require("mongoose");
const { Blog } = require("../models/Blog");
const { User } = require("../models/User");
const blogRouter = Router();

blogRouter.post("/", async function (req, res) {
  try {
    const { title, content, islive, userId } = req.body;
    //bolg바디에 작성한 ref를 userId에 저장

    let user = await User.findById(userId);
    //해당 Id를 User테이블에서 find
    if (!user) {
      return res.status(400).send({ error: "user가 없습니다." });
    }

    let blog = new Blog({ ...req.body, user });
    //그냥 req.body로 넣어도 상관없는데 위에 user도 가져와야하기때문에
    //깊은 복사(...)로 복사 하고 위에 가져온 user를 넣어서 저장했다.
    await blog.save();
    return res.send({ blog });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

blogRouter.get("/", async function (req, res) {
  try {
    const blogs = await Blog.find({});
    return res.send({ blogs });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

blogRouter.get("/:blogId", async function (req, res) {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findOne({ _id: blogId });
    return res.send({ blog });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

blogRouter.put("/:blogId", async function (req, res) {
  try {
    const { blogId } = req.params;
    const { title, content } = req.body;

    const blog = await Blog.findOneAndUpdate(
      { _id: blogId },
      { title, content },
      { new: true }
    );
    return res.send({ blog });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

blogRouter.patch("/:blogId/live", async function (req, res) {
  try {
    const { blogId } = req.params;
    const { islive } = req.body; //patch할꺼 가져오기

    const blog = await Blog.findByIdAndUpdate(
      blogId,
      { islive }, //$set 써도되고 안써도 됨
      { new: true }
    );
    return res.send({ blog });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

blogRouter.delete("/", async function (req, res) {
  try {
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = { blogRouter };
