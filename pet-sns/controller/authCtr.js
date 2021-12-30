const User = require("../model/auth");
// 문자열을 암호화하는데 빠르게 도와준다.
const bcrypt = require("bcrypt");

// 레지스터 관련 코드 작성하는 곳
const authCtr = {
  register: async (req, res) => {
    // 사용자의 요청으로 부터 username과 password를 req.body에서 꺼내온다
    const { username, password } = req.body;
    // 유저네임과 일치하는지 확인을 해야한다
    // 사용자 정보를 확인해야한다.
    // 일치하는 항목이 존재하면
    const exist = await User.findOne({ username: username });
    // findOne을 통해 트루시인지 폴시값인지 알 수 있다.
    if (exist) {
      res.status(504).send("user exist");
      return;
    }

    // 일치하지 않다면 회원가입을 진행해야된다
    const user = new User({
      username: username,
    });

    // password를 그대로 데이터베이스에 그대로 저장하면 위험하다
    // 그렇기에 암호화를 통해서 저장해야한다
    const hashedPassword = await bcrypt.hash(password, 10);
    // 비크립트 알고리즘을 사용해서 password를 해쉬 알고리즘을 10번이나 돌린다
    user.password = hashedPassword;
    await user.save();
    res.redirect("/");
  },
};

// 외부파일 사요하게 만들기
module.exports = authCtr;
