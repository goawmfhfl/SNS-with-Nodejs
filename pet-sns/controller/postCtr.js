const Post = require("../model/post");

const postCtr = {
  upload: async (req, res) => {
    const { title, content } = req.body;
    // 이미지를 불러와야한다. s3에 업로드를 활용하는 방법을 알아보자
    const imgae = req.file;
    console.log(image);
  },
};
