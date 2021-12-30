//방금 작성 했던 내용 같은 경우에는
//그니까 게시물 같은 경우에는 로그인을 안 보여줄 수 있게 하는 게 좋겠지
//방금 전에는 로그인 하든 로그아웃을 하지 않던간에
// 모든 사람이 정보를 볼 수 있었어
//근데 이제 로그인을 한 사람만 계심을 볼 수 있게 작성을 하려고 해

const checkUser = (req, res, next) => {
  if (!req.userInfo) {
    res.status(400).send("user not login!!");
    return;
  }
  return next();
};

module.exports = checkUser;
