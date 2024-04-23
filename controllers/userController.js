const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const fs = require("fs");

const userModel = require("../models/userModel");

exports.registration = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required !" });
    }

    let user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ error: "User with the given email already exist!" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Enter a valid email !" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({
        error:
          "Password must be a strong password : { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}",
      });
    }

    user = new userModel({ username, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    res.status(200).json({ _id: user._id, username, email });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password !" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(400).json({ error: "Invalid email or password !" });
    }

    const token = jwt.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_SECRET
    );

    return res.json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: email,
        image: user.image,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

exports.signout = (req, res) => {
  // delete token in the cookie
  res.clearCookie("token");
  res.json({
    message: "User Signout Successfully !",
  });
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    res.send(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

exports.findUser = async (req, res) => {
  req.profile.password = undefined;

  res.status(200).json({
    user: req.profile,
  });
};

exports.updateUser = async (req, res) => {
  try {
    const result = await userModel.findByIdAndUpdate(
      req.profile._id,
      req.body,
      { new: true }
    );
    res.status(200).json({ user: result });
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

exports.updateUserPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    let user = req.profile;

    const isValidPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isValidPassword) {
      return res.status(400).json({
        error:
          "Current password is incorrect. Please double-check and try again.",
      });
    }

    if (!validator.isStrongPassword(newPassword)) {
      return res.status(400).json({
        error:
          "Password must be a strong password : { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}",
      });
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    user.save();
    res.status(200).json({ message: "Password Updated SuccessFully !" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
