import express from "express";
import asyncHanlder from "express-async-handler";
const router = express.Router();
import Product from "../models/productModel.js";

// @desc Fetch all products
// @route GET / api / products
// @desc Public
console.log();

router.get(
  "/",
  asyncHanlder(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
  }),
);

// @desc Fetch single products
// @route GET / api / products
// @desc Public

router.get(
  "/:id",
  asyncHanlder(async (req, res) => {
    const products = await Product.findById(req.params.id);
    if (products) {
      res.json(products);
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  }),
);

export default router;
