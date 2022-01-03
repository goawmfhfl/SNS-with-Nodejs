const express = require("express");
const products = require("./data/products");

const app = express();

app.get("/", (req, res) => res.send("API is running"));
// products 파일로 이동시에 응답으로 json형태의 product파일을 보낸다.
app.get("/api/products", (req, res) => {
  res.json(products);
});
app.get("/api/products/:id", (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  res.json(product);
});

app.listen(4000, console.log("serever runnion on port 4000"));
