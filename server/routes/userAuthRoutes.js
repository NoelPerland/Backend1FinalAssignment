const express = require("express");
const { login } = require("../controllers/authenticationController/login");
const {
  register,
} = require("../controllers/authenticationController/register");
const userAuthRoutes = express.Router();

userAuthRoutes.post("/register", register);

userAuthRoutes.post("/login", login);

exports.userAuthRoutes = userAuthRoutes;
