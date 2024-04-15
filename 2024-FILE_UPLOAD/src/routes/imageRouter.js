const { Router } = require("express");
const imageRouter = Router();
const { upload } = require("../middlewares/imageUpload");
const { Image } = require("../models/Image");

imageRouter.post("/", upload.array("images", 5), async function (req, res) {
  try {
    console.log(req.files);

    //싱글 파일-----
    // const image = await new Image({
    //   //스키마에서 작성한 틀을 가져온다. (비어잇음) 때문에 file의 데이터를 넣어준다.
    //   fileName: req.file.filename,
    //   originalFileName: req.file.originalname,
    //   title: req.body.title,
    // }).save();

    // return res.send({ image });

    //멀티 파일-----
    const { title, content } = req.body;
    const images = [];
    req.files.forEach(function (item) {
      images.push({
        originalname: item.originalname,
        filename: item.filename,
      });
    });
    console.log(images);
    const image = await new Image({ ...req.body, images }).save();
    return res.send({ image });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

module.exports = { imageRouter };
