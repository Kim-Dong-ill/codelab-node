const { Router } = require("express");
const commentRouter = Router({ mergeParams: true });
const { Blog } = require("../models/Blog.js");
const { User } = require("../models/User.js");
const { Comment } = require("../models/Comment.js");
const { default: mongoose } = require("mongoose");

// /blog/:blogId/comment

commentRouter.post("/", async function (req, res) {
  try {
    const { blogId } = req.params;
    const { content, userId } = req.body;

    const [blog, user] = await Promise.all([
      Blog.findOne({ _id: blogId }),
      User.findById(userId),
    ]);

    // const blog = await Blog.findOne({ _id: blogId });
    // const user = await User.findById(userId);
    if (!blog || !user) {
      res.status(400).send({ error: "blog, user를 찾을 수 없습니다." });
    }

    const comment = new Comment({ content, user, blog });
    await comment.save();

    return res.send({ comment });
  } catch (error) {
    res.status(500), send({ error: error.message });
  }
});

commentRouter.get("/", async function (req, res) {
  try {
    const { blogId } = req.params;
    const comments = await Comment.find({ blog: blogId });
    return res.send({ comments });
  } catch (error) {
    res.status(500), send({ error: error.message });
  }
});

// commentRouter.post("/", async function (req, res) {
//   try {
//   } catch (error) {
//     res.status(500), send({ error: error.message });
//   }
// });
module.exports = { commentRouter };
