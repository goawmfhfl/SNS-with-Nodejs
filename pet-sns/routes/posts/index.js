const express = require("express");
const router = express.Router();
const upload = require("../../module/multer");
const postCtr = require("../../controller/postCtr");
const checkUser = require("../../module/checkUser");

router.get("/upload", checkUser, (req, res) => {
  res.render("upload");
});

// 조회 같은 경우에는 사용자가 아니더라도 확인할 수 있다.
router.get("/:id", postCtr.detail);

router.get("/update/:id", checkUser, postCtr.updateLayout);

// 업로드 구현
router.post("/", checkUser, upload.single("image"), postCtr.upload);
// 어떤 사람이 업로드했는지 알아야 한다.

// update 구현
// 그 사용자가 본인인가?? 를 확인해 줘야 한다.
router.post("/update/:id", checkUser, postCtr.update);

// delete 구현
router.post("/delete/:id", checkUser, postCtr.delete);

// like 기능 구현
router.post("/like/:id", checkUser, postCtr.like);

module.exports = router;
