const joi = require("joi");

const authSchema = joi.object({
  username: joi.string().min(3).max(50).required(),
  password: joi.string().min(3).max(50).required(),
});

exports.authSchema = authSchema;
