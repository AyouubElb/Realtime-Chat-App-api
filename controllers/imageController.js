const imageModel = require("../models/imageModel");
const fs = require("fs");
const cloudinary = require("../middlewares/cloudinary");

exports.uploadImage = async (req, res) => {
  try {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    const newImage = imageModel({
      file: result.secure_url,
      cloudinary_id: result.public_id,
    });
    newImage.save();
    res.send(newImage);
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error });
  }
};

exports.getAllImages = async (req, res) => {
  try {
    const images = await imageModel.find();
    res.send(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ error: "Error fetching images" });
  }
};

exports.getImageById = async (req, res) => {
  try {
    const id = req.params.imageId;
    const image = await imageModel.findById(id);
    res.send(image);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};
