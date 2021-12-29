var express = require("express");
var router = express.Router();
const authRouter = require("./auth/index");

router.get("/", (req, res) => {
  res.render("index", { postList: [""] });
});

router.use("/auth", authRouter);

module.exports = router;
