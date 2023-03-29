const express = require("express");
const { getTodo } = require("../controllers/todosController/getTodo");
const { postTodo } = require("../controllers/todosController/postTodo");
const { patchTodo } = require("../controllers/todosController/patchTodo");
const { deleteTodo } = require("../controllers/todosController/deleteTodo");

const userTodoRoutes = express.Router();

userTodoRoutes.get("/", getTodo);
userTodoRoutes.post("/", postTodo);
userTodoRoutes.patch("/", patchTodo);
userTodoRoutes.delete("/", deleteTodo);

exports.userTodoRoutes = userTodoRoutes;
