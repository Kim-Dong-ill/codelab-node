const express = require("express");
const app = express();
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const { userRouter } = require("./routes/userRouter");
const { blogRouter } = require("./routes/blogRouter");
const { commentRouter } = require("./routes/commentRouter");

const server = async function () {
  try {
    await mongoose.connect(process.env.MON_URL);
    console.log("db connected");
    mongoose.set("debug", true);

    //유저 라우터
    app.use("/user", userRouter); //기본 연결 URL

    //블로그 라우터
    app.use("/blog", blogRouter); //기본 연결 URL

    //코멘트 라우터
    app.use("/blog/:blogId/comment", commentRouter);

    app.listen(3000);
  } catch (error) {
    console.log("연결 안됨");
  }
};

server();
