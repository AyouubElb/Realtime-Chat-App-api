const express = require("express");

const {
  createMessage,
  getMessages,
} = require("../controllers/messageController");
const { requireSignIn, isAuth } = require("../middlewares/auth");

const { userById } = require("../middlewares/user");

const router = express.Router();

// router.post("/:userId", requireSignIn, isAuth, createMessage);
router.post("/:userId", createMessage);
router.get("/:chatId", getMessages);

router.param("userId", userById);

module.exports = router;
