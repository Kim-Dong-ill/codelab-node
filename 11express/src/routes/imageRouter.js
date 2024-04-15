const { Router } = require("express");
const imageRouter = Router();
const { upload } = require("../middleware/upload");
const { Image } = require("../model/Image");

imageRouter.post("/", upload.single("image"), async function (req, res) {
  try {
    console.log(req.file);

    const { filename, originalname } = req.file;
    const image = { filename, originalname };

    const upload = new Image({ image });
    await upload.save();

    return res.send(upload);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

imageRouter.post(
  "/images",
  upload.array("images", 2),
  async function (req, res) {
    try {
      //   console.log(req.files);

      const image = [];
      req.files.forEach(function (item) {
        image.push({
          filename: item.filename,
          originalname: item.originalname,
        });
      });

      console.log(image);
      const uploads = new Image({ image });
      await uploads.save();

      return res.send(uploads);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  }
);

module.exports = { imageRouter };
