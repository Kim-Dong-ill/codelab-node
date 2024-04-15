const multer = require("multer");
const { v4: uuid } = require("uuid");
const mime = require("mime-types");

//01st
// const upload = multer({ dest: "uploads" });

//02st
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, uuid() + "." + mime.extension(file.mimetype)); //file.originalname
  },
});
const upload = multer({
  storage: storage,
  // fileFilter: function (req, file, cb) {
  //   // if (file.mimetype === "image/jpeg") {
  //   //   cb(null, true);
  //   // } else {
  //   //   cb(new Error("jpeg만 업로드 가능"), false);
  //   // }
  //   // if (["image/jpeg"].includes(file.mimetype)) {
  //   //   cb(null, true);
  //   // } else {
  //   //   cb(new Error("jpeg만 업로드 가능"), false);
  //   // }
  // },
  // limits: {
  //   fileSize: 1024 * 1024 * 3, //파일 용량 제한
  // },
});

module.exports = { upload };
