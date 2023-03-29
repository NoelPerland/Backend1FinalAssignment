const joi = require("joi");

const todoPostSchema = joi.object({
  todo: joi.string().min(4).max(250).required(),
  completed: joi.string().max(1).required(),
});

exports.todoPostSchema = todoPostSchema;
