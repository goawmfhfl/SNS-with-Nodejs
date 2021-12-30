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

// put을 사용할건데 왜 post로 주는 것인가?
// form형태를 통해서 데이터를 전송할 때 get post 밖에 쓰지 못함.
// 결국 데이터를 전송할 때 필요하기 때문에 post로 진행한다는 것이다.
// post를 썻지만 기능은 put과 같다.
router.post("/update/:id", postCtr.update);

module.exports = router;
