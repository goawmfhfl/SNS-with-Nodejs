const Post = require("../model/post");

/* 우리가 원하는 데이터 포멧을 직접 만들기 */
// 2020-12-29 형태로 나오게 해야함
const formatDate = date => {
  let d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  let year = d.getFullYear();
  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }
  return [year, month, day].join("-");
};

const postCtr = {
  upload: async (req, res) => {
    const { title, content } = req.body;
    // 이미지를 불러와야한다. s3에 업로드를 활용하는 방법을 알아보자
    const image = req.file.location;
    const publishedDate = formatDate(new Date());
    const post = new Post({
      title: title,
      content: content,
      image: image,
      publishedDate: publishedDate,
      user: req.userInfo,
    });
    try {
      await post.save();
      // 저장하고 다시 메인페이지로 이동
      res.redirect("/");
    } catch (error) {
      res.status(500).send("upload error");
    }
  },
  list: async (req, res) => {
    //전체 게시물을 불러온다음에 posts에 초기화
    const posts = await Post.find({});
    // 전체 게시물을 postList라는 키값에 저장한 후 index로 데이터를 전달한다
    res.render("index", { postList: posts });
  },
  detail: async (req, res) => {
    // <a href="/posts/<%= e._id %>" class="header"><%= e.title %></a>
    // _id값을 통해서 해당 게시물에 접근하는 것을 알 수 있다.
    // 해당 id값을 바탕으로 접근하고 보여줘야한다
    const { id } = req.params;
    // 아이디를 바탕으로 게시물 조회하기
    const post = await Post.findById(id);
    // 찾아온 결과값을 detail 페이지로 넘겨주기
    res.render("detail", { post: post });
  },
  // 업데이트 페이지에 진입을 했을 때 이전의 데이트들이
  // 업데이트 페이지에 이미 바운딩 되어있으면 편하다.
  updateLayout: async (req, res) => {
    const { id } = req.params;
    // post 변수에 DB에서 일치하는 id값을 찾아온다.
    const post = await Post.findById(id);
    res.render("update", { post: post });
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
      await Post.findByIdAndUpdate(
        id,
        { title: title, content: content },
        // 업데이트된 값을 반영하기 위해서 new true를 해줘야한다.
        { new: true },
      );
      res.redirect("/");
    } catch (error) {
      res.status(500).send("Update error");
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      await Post.findByIdAndDelete(id);
      res.redirect("/");
    } catch (error) {
      res.status(500).send("delete error");
    }
  },
};

module.exports = postCtr;
