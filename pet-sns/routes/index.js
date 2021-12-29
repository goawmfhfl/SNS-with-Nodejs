var express = require("express");
var router = express.Router();
const authRouter = require("./auth/index");

router.get("/", (req, res) => {
  res.render("index", { postList: [] });
});

router.use("/auth", authRouter);
//auth라는 url로 접근을 하게된다면
// 모든 요청을 authRouter로 보낼거야 !
// 최종적으로 app.js에 있는 var indexRouter = require("./routes/index");
// 의 요청에 의해서 현재 위치한 index.js로 요청이 올 경우
// /auth 라는 링크를 통해서 이동해야지 login/에 접근이 가능한 것이다.

// "/" 링크로 접속했을 때 view폴더에 있는 index파일을 먼저 보여준다
// 게시물들에 대한 정보를 postList에 담아온다

module.exports = router;
