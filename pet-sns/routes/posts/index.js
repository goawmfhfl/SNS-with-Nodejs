const express = require("express");
const router = express.Router();
const upload = require("../../module/multer");
const postCtr = require("../../controller/postCtr");

router.get("/upload", (req, res) => {
  res.render("upload");
});

router.get("/:id", postCtr.detail);
// update 구현
router.get("/update/:id", postCtr.updateLayout);

// update 와
// delete 역시 외부 Ctr 폴더로 관리를 해줄 예정이다.
router.post("/", upload.single("image"), postCtr.upload);

module.exports = router;
