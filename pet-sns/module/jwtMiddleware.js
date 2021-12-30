const jwt = require("jsonwebtoken");
// 시크릿키를 통해서 jwt를 만들었었다.
// 이제는 복호화를 통해서 jwt를 사용할 예정이다
const secretKey = require("../config/secretKey.json");

const jwtMiddleware = async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    // 없다면 아래와 같은 명령어를 입력한다.
    // 데이터를 넘겨주는 함수를 한다. 데이터의 key값이 isAuthenticated
    // 빈 객체를 보내줌
    // 로그인 되지 않았다고 빈 객체를 주기 위해서 사용
    // 이것을 사용하는 이유는 로그인을 할 경우 로그아웃 버튼을 보여줘야하며
    // 로그아웃 일 때는 로그인 상태를 보여주기 위해서 사용한다.
    res.locals.isAuthenticated = {};
    return next;
  }
  try {
    // decoded 는 복호화를 뜻한다.
    // 유저 정보에 있던 token과 secretKey.key를 다시 복호화해준후에
    const decoded = jwt.verify(token, secretKey.key);
    // userInfo 복호화된 _id값과 username값을 담는다.
    req.userInfo = {
      _id: decoded._id,
      username: decoded.username,
    };
    res.locals.isAuthenticated = { username: decoded.username };
    return next();
  } catch (error) {
    res.status(500).send("jwt error");
  }
};

module.exports = jwtMiddleware;
