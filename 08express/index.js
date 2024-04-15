const express = require("express");
const { default: mongoose, mongo } = require("mongoose");
const app = express();
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();

const multer = require("multer");
const { v4: uuid } = require("uuid");
const mime = require("mime-types");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, uuid() + "." + mime.extension(file.mimetype));
  },
});
// const upload = multer({ dest: "uploads" });
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype === "image/jpeg") {
      cb(null, true);
    } else {
      cb(new Error("jpeg만 가능"), false);
    }
  },
});

app.use("/uploads", express.static("uploads"));
const MON_URL =
  "mongodb+srv://ehddlf289344:KNNxGy7M2DcDoKX4@mongodb.g8f7dmy.mongodb.net/fileup2?retryWrites=true&w=majority&appName=MongoDB";

const server = async function () {
  try {
    await mongoose.connect(MON_URL);
    console.log("db connected");

    //파일 업로드
    app.post("/upload", upload.single("image"), async function (req, res) {
      console.log(req.file);
      return res.send(req.file);
    });

    app.listen(3000);
  } catch (error) {
    return console.log("db not connected");
  }
};

server();
