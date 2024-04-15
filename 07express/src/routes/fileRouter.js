const { Router } = require("express");
const fileRouter = Router({ mergeParams: true });

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

const upload = multer({
  storage,
  // fileFilter: function (req, file, cb) {},
});

fileRouter.post("/", upload.single("image"), async function (req, res) {
  return res.send(req.file);
});

module.exports = { fileRouter };
