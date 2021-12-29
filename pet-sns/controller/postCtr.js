const Post = require("../model/post");

/* 우리가 원하는 데이터 포멧을 직접 만들기 */
// 2020-12-29 형태로 나오게 해야함
const formatDate = date => {
  let d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  let year = d.getFullYear();
  if (month.length < 2) {
    month = `0 ${month}`;
  }
  if (day.length < 2) {
    day = `0 ${day}`;
  }
  return [year, month, day].join("-");
};

const postCtr = {
  upload: async (req, res) => {
    const { title, content } = req.body;
    // 이미지를 불러와야한다. s3에 업로드를 활용하는 방법을 알아보자
    const image = req.file;
    const publishedDate = formatDate(new Date());
    // 2020-12-29 형태로 나오게 해야함
  },
};

module.exports = postCtr;
