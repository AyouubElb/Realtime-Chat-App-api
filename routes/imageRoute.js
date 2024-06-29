const express = require("express");
const multer = require("multer");
const path = require("path");
const imageModel = require("../models/imageModel");
const fs = require("fs");

const {
  uploadImage,
  getAllImages,
  getImageById,
} = require("../controllers/imageController");

// const { upload } = require("../middlewares/uploadImage");
const upload = require("../middlewares/multer");

const router = express.Router();

router.post("/upload-image", upload.single("image"), uploadImage);
router.get("/", getAllImages);

router.get("/:imageId", getImageById);

module.exports = router;
