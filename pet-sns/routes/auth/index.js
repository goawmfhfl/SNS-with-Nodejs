const express = require("express");
const router = express.Router();
const authCtr = require("../../controller/authCtr");

// 회원가입 기능 구현하기
// register라는 경로에 접속하면 회원가입이 진행되도록하자
router.post("/register", authCtr.register);
router.post("/login", authCtr.login);

// 로그인 라우터 구현
// 로그인 url 접속 시에 login ejs 파일을 보여준다
// auth/login
router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/logout", (req, res) => {
  //쿠키를 제거하면 로그아웃을 구현할 수 있다.
  // logout url에 접근하면 응답값으로 브라우저의 쿠키를 지우는 값을 보낸다.
  // 이떄 delete가 아닌건 또 신기하다.
  // 일단 응답값으로 delete를 보내기 위해서 post를 사용한 것 같다.
  res.clearCookie("access_token");
  // 초기 화면으로 되돌아가기
  res.redirect("/");
});

// 라우터를 외부 파일에서도 사용할 수 있게 세팅해주었다
module.exports = router;
