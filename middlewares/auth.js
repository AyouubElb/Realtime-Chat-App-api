const { expressjwt } = require("express-jwt");

require("dotenv").config();

// check if the user requested is sign in
exports.requireSignIn = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(404).json({
      error: "Unauthorized",
    });
  }
  next();
};
