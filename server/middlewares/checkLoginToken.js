const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.DATABASE_SECRET;

exports.checkLoginToken = function checkLoginToken(req, res, next) {
  if (!req.cookies.loginToken) {
    res.status(404).json({ message: "Cannot find LoginToken" });
    return;
  }
  try {
    const loginToken = req.cookies.loginToken;
    const loggedInUser = jwt.verify(loginToken, SECRET);
    req.loggedInUser = loggedInUser;
    next();
    return;
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Unauthorized LoginToken" });
    return;
  }
};
