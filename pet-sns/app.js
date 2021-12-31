var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const jwtMiddleware = require("./module/jwtMiddleware");

var indexRouter = require("./routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//라우터를 모든 라우터에 접근할 때 사용자의 정보를 파악해줘야함
//라우터 앞단에 middleware를 넣는다.
// 사용자가 로그인되어있는지 안되어있는지 미들웨어를 통해서 요청 결과값을 받을 수 있다
app.use(jwtMiddleware);
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// app에 불러와서 연결을 시켜줘야한다
// 초기환경세팅 끝
// 1. www에 attach
// 2. app.js에 소켓 아이오 연결
app.io = require("socket.io")();
// 클라이언트가 접속했을 때 커넥션 진행
app.io.on("connection", socket => {
  //(now server) emit에서 보낸 정보를 받아낸다.
  socket.on("chat-msg", (user, msg) => {
    // 전체 클라이언트에게 해당 메세지와 username을 보낼 수 있다.
    app.io.emit("chat-msg", user, msg);
    // 이 정보를 이제 emit을 통해서 다시 클라이언트의 on과 연동짓게한다.
  });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
