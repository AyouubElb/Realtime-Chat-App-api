const express = require("express");

const {
  createChat,
  findUserChats,
  findChat,
  updateChat,
} = require("../controllers/chatController");

const router = express.Router();

router.get("/:userID", findUserChats);

router.get("/find/:firstId/:secondId", findChat);

router.post("/", createChat);

router.patch("/update/:chatId", updateChat);

module.exports = router;
