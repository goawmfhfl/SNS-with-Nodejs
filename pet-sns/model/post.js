/*
게시물이 들어간다
게시물에 필요한 Schema 작성

잠깐 Schema란 무엇인가?
어떠한 구조로, 어떤 제약조건으로 저장되어야 하는지 정의한 것이다.
이러한 제약 조건이 있기 때문에 구조적으로 저장이 될 수 있는 것이다.

이제 우리가 정해준 Schema로 DB에 전달된 정보가 저장된다.

*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: String,
  content: String,
  image: String,
  publisheDate: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  likeUser: {
    type: Array,
    default: [],
  },
  comment: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("post", postSchema);
