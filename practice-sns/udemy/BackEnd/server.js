const express = require("express");
const dotenv = require("dotenv");
const products = require("./data/products");

dotenv.config();

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

const PORT = process.env.PORT || 4000;

app.listen(
  PORT,
  console.log(
    `Serever Running in ${process.env.NODE_ENV} mode on port ${PORT}`,
  ),
);
