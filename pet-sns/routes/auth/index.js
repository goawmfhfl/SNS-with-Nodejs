const express = require("express");
const router = express.Router;

// 로그인 라우터 구현
// 로그인 url 접속 시에 login ejs 파일을 보여준다
// auth/login
router.get("/login", (req, res) => {
  res.render("login");
});

// 회원가입 라우터 구현
// 로그인 url 접속 시에 register ejs 파일을 보여준다
router.get("/register", (req, res) => {
  res.render("register");
});

// 라우터를 외부 파일에서도 사용할 수 있게 세팅해주었다
module.exports = router;
