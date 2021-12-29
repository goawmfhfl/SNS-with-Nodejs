/*
게시물이 들어간다
게시물에 필요한 Schema 작성

잠깐 Schema란 무엇인가?
어떠한 구조로, 어떤 제약조건으로 저장되어야 하는지 정의한 것이다.
이러한 제약 조건이 있기 때문에 구조적으로 저장이 될 수 있는 것이다.

이러한 스키마 작성으로 인해서
mongoose에서 받아온 자료를 아래와같은 타입으로 우리가 전달받는 것이다.
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
