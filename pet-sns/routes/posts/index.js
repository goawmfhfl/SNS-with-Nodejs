const express = require("express");
const router = express.Router();
const upload = require("../../module/multer");
const postCtr = require("../../controller/postCtr");

router.get("/upload", (req, res) => {
  res.render("upload");
});

router.get("/:id", postCtr.detail);

router.get("/update/:id", postCtr.updateLayout);

router.post("/", upload.single("image"), postCtr.upload);
// update 구현
router.post("/update/:id", postCtr.update);
// delete 구현
router.post("/delete/:id", postCtr.delete);

module.exports = router;
