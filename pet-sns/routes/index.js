var express = require("express");
var router = express.Router();
const authRouter = require("./auth/index");
const postsRouter = require("./posts/index");
const postCtr = require("../controller/postCtr");

// 기본 페이지에 접속하면 postCtr의 list들을 보여주자 !
// 이때 전달받은 postCtr은 객체이다. 객체안의 속성에 접근할 때는
// 객체명.속성으로 접근하기 때문에 postCtr.list라고 한 것이다.
// list에는 DB에 저장된 정보들이 담겨있다.
// 또한 index를 렌더링한다.
// 아직 흐름은 감이 안잡히지만 일단은 이해하고 넘어가자
router.get("/", postCtr.list);

router.use("/auth", authRouter);
router.use("/posts", postsRouter);

module.exports = router;
