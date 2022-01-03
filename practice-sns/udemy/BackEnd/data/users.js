import bcryptjs from "bcryptjs";

const users = [
  {
    name: "BoYun",
    email: "admin@example1.com",
    password: bcryptjs.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Bong min",
    email: "admin@example2.com",
    password: bcryptjs.hashSync("123456", 10),
  },
  {
    name: "Jae mo",
    email: "admin@example3.com",
    password: bcryptjs.hashSync("123456", 10),
  },
];

export default users;
