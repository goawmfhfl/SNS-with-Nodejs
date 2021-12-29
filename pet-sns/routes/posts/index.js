const express = require("express");
const router = express.Router();
const upload = require("../../module/multer");
const postCtr = require("../../controller/postCtr");

router.get("/upload", (req, res) => {
  res.render("upload");
});

router.get("/:id", postCtr.detail);

router.get("/update/:id", (req, res) => {
  res.render("update");
});
// 내부에서 로직을 작성하는 방식은 유지보수가 힘들다
// 그렇기 때문에 controller라는 폴더를 생성해서
// post에 대한 로직을 외부에서 작성해서 사용한다.
router.post("/", upload.single("image"), postCtr.upload);

module.exports = router;
