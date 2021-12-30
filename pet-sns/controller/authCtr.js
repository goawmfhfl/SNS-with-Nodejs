const User = require("../model/auth");
// 문자열을 암호화하는데 빠르게 도와준다.
const bcrypt = require("bcrypt");
const secretKey = require("../config/secretKey.json");
// jwt 패키지 불러오기
const jwt = require("jsonwebtoken");

// 레지스터 관련 코드 작성하는 곳
const authCtr = {
  register: async (req, res) => {
    const { username, password } = req.body;
    const exist = await User.findOne({ username: username });
    if (exist) {
      res.status(504).send("user exist");
      return;
    }
    const user = new User({
      username: username,
    });
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();
    res.redirect("/");
  },
  login: async (req, res) => {
    const { username, password } = req.body;
    // 사용자의 요청에 담긴 정보(req.body)를 통해서
    // 그 정보를 토대로 DB를 검색해서 찾아본다.
    const user = await User.findOne({ username: username });
    // 만약 유저가 아니라면 user not found를 출력
    if (!user) {
      res.status(500).send("user not found!");
      return;
    }
    // 만약  유저가 맞다면
    // 유저의 패스워드 데이터 베이스 패스워드 확인해야함
    // user.password(데이터 베이스에 있는 비밀번호)
    //요청받은 password (현재 클라이언트가 요청하는 비밀번호)
    const valid = await bcrypt.compare(password, user.password);
    // 만약 일치하지 않으면 아래와 같은 if문이 작동한다.
    if (!valid) {
      res.status(500).send("password invalid");
    }
    // 만약 일치한다면?
    const data = user.toJSON;
    // 패스워드를 왜 지워주는걸까?
    delete data.password;
    // 토크나이징
    const token = jwt.sign(
      {
        _id: data._id,
        username: username,
      },
      secretKey.key,
      // 외부 파일 config에서 key값을 불러왔다.
      // 해당 토근은 기한을 두는 것이다
      // 실무에서는 30분, 1시간 등등 짧게 한다
      // 하지만 나는 연습이기에 일주일로정해주었다.
      {
        expiresIn: "7d",
      },
    );
    // 두번째 인자는 이를 암호화 할 수 있는 시크릿 키를 입력해야한다.
    // 문자열 형태로 입력을 해야하는데 암호화 복호화는 보안이 중요하기 떄문에
    // 외부파일로 옮겨준다
    res.cookie("access_token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
    // maxAge의 값은 milliseconds 단위를 사용하기 떄문에 1000 millisecondes
    // 1(초) * 60(초) * 60(분) * 24(시간) * 7(일) = 7일
    // http에서만 접근이 가능하게 설정
    res.redirect("/");
  },
};

module.exports = authCtr;
