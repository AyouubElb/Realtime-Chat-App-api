const User = require("../models/userModel");

exports.userById = (req, res, next, id) => {
  User.findById(id)
    .populate("image")
    .exec()
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error: "user not found !",
        });
      }
      req.profile = user;
      next();
    })
    .catch((err) => {
      // Handle the error
      return res.status(500).json({
        error: "Internal server error",
      });
    });
};
