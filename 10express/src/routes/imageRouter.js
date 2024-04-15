const { Router } = require("express");
const imageRouter = Router();
const { upload } = require("../middleware/image");
const { User } = require("../model/User");
const { Image } = require("../model/Image");

//단일 이미지 post
imageRouter.post("/", upload.single("image"), async function (req, res) {
  try {
    console.log(req.file);
    return res.send(req.file);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

//단일 이미지 put
imageRouter.put("/:userId", upload.single("image"), async function (req, res) {
  try {
    console.log(req.file);
    const { userId } = req.params;
    const { originalname, filename } = req.file;

    const image = { originalname, filename };

    const user = await User.findByIdAndUpdate(
      userId,
      // { $set: { filename: filename, originalname: originalname } },
      { image },
      { new: true }
    );

    return res.send({ user });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

//다중 이미지 post
imageRouter.post("/many", upload.array("image", 5), async function (req, res) {
  try {
    console.log(req.files);

    // const { filename, originalname } = req.files;
    const images = [];
    req.files.forEach(function (item) {
      images.push({
        filename: item.filename,
        originalname: item.originalname,
      });
    });
    console.log(images);

    const image = new Image({ images: images });
    await image.save();

    return res.send(image);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});
module.exports = { imageRouter };
