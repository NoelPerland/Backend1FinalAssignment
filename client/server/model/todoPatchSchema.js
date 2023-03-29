const joi = require("joi");

const todoPatchSchema = joi.object({
  todo_id: joi.number().required(),
  completed: joi.number().max(1).required(),
});

exports.todoPatchSchema = todoPatchSchema;
