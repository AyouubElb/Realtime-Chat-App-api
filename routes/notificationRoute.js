const express = require("express");

const { createNotification } = require("../controllers/notificationController");

const router = express.Router();

router.post("/create", createNotification);

module.exports = router;
