const express = require("express");

const {
  registration,
  loginUser,
  signout,
  findUser,
  updateUser,
  updateUserPassword,
  getAllUsers,
} = require("../controllers/userController");

const { requireSignIn, isAuth } = require("../middlewares/auth");

const { userById } = require("../middlewares/user");
const { upload } = require("../middlewares/uploadImage");

const router = express.Router();

router.get("/", getAllUsers);

router.get("/find/:userId", findUser);

router.post("/register", registration);

router.post("/login", loginUser);

router.get("/signout/:userId", signout);

router.patch("/update/:userId", updateUser);

router.put("/update-user-password/:userId", updateUserPassword);

router.param("userId", userById);

module.exports = router;
