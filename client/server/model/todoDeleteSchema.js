const joi = require("joi");

const todoDeleteSchema = joi.object({
  todo_id: joi.number().required(),
});

exports.todoDeleteSchema = todoDeleteSchema;
