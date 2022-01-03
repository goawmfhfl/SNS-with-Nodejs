import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.get("/", (req, res) => res.send("API is running"));
// products 파일로 이동시에 응답으로 json형태의 product파일을 보낸다.

app.use("/api/products", productRoutes);

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(
  PORT,
  console.log(
    `Serever Running in ${process.env.NODE_ENV} mode on port ${PORT}`.bgBlue
      .bold,
  ),
);
