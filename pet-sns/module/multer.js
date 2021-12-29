const multer = require("multer");
// multer 패키지 불러오기
const multerS3 = require("multer-s3");
// multerS3 패키지 불러오기
const aws = require("aws-sdk");

// aws 접근권한 부여 및 활용하는 패키지 받아오기
aws.config.loadFromPath(__dirname + "/../config/s3Info.json");
// loadFromPath를 통해서 config에 있는 정보를 aws.config라는 속성값에 추가해준 것이다

const s3 = new aws.S3();
// s3라는 데이터 베이스를 불러온다.
const upload = multer({
  //multer는 파일을 업로드할 때 유용한 패키지다.
  storage: multerS3({
    //storage에 대한 정보는 AWS 버킷에서 설정한 정보들을 입력한다.
    s3: s3,
    bucket: "myfirstdatabase",
    acl: "public-read-write",
    key: (req, file, cd) => {
      cd(null, Date.now() + "." + file.orginalname.split(".").pop());
      // 확장자명을 .을 통해서 분리하고  확장자를 pop을 통해서 제거해주려고하는 것이다.
      // dog.png 라는 파일이 들어오면 dog png로 나뉘어지며 png는 삭제가 된다.
    },
  }),
});

module.exports = upload;
