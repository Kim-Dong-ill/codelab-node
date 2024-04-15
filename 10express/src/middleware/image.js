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
  // fileFilter:function(req,file,cb){}
});

module.exports = { upload };
