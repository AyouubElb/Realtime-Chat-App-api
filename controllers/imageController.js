const imageModel = require("../models/imageModel");
const fs = require("fs");

exports.uploadImage = async (req, res) => {
  try {
    const name = req.file.filename;
    if (!name) {
      res.status(404).json({ error: "upload an image!" });
    }
    const newImage = imageModel({ name });
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
