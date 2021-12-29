var express = require("express");
const res = require("express/lib/response");
var router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { postList: [] });
});

// "/" 링크로 접속했을 때 view폴더에 있는 index파일을 먼저 보여준다
// 게시물들에 대한 정보를 postList에 담아온다

module.exports = router;
