import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

// 더미데이터
import users from "./data/users.js";
import products from "./data/products.js";

// 스키마
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";

// 디비 연결
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // 모든것을 지워버릴것이다.??
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    // 생성된 유저의 정보를 담는 배열이다.
    const createdUser = await User.insertMany(users);

    const adminUser = createdUser[0]._id;
    // 관리자가 사용하는 샘플 페이지
    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser };
    });
    // sampleProducts에는 어떤 변수가 담기는가?
    // adminUser로 인해서 isAdmin 스키마를 가지고 있던 유저는
    // true 값을 가질 수 있게 되었다.

    await Product.insertMany(sampleProducts);
    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // 모든것을 지워버릴것이다.??
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log("Data Destroed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-D") {
  destroyData();
} else {
  importData();
}
