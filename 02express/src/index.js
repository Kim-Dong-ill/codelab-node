const express = require("express");
const { Book } = require("./model/book.js");
const app = express();

//mongoose
const mongoose = require("mongoose");

//mongoose db 연결
const MONGO_URL =
  "mongodb+srv://ehddlf289344:KNNxGy7M2DcDoKX4@mongodb.g8f7dmy.mongodb.net/book_tbl?retryWrites=true&w=majority&appName=MongoDB";

// 빈 공간 만들어줌
const books = [];

const server = async function () {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("db connected");

    //json형식 읽을 수 있게 바꿔줌
    app.use(express.json());

    app.get("/book", function (req, res) {
      // get
      return res.send({ books: books });
    });

    app.post("/book", async function (req, res) {
      let { name, bookName, page } = req.body;
      if (!name) {
        res.status(400).send("이름이 없습니다.");
      } else if (!bookName) {
        res.status(400).send("책이름이 없습니다.");
      } else if (!page) {
        res.status(400).send("페이지가 없습니다.");
      }

      const book = new Book(req.body);
      await book.save();
      res.send({ book });
    });
  } catch (error) {
    res.status(500).send({ error: error.messgae });
  }

  app.listen(3000);
};

server();
