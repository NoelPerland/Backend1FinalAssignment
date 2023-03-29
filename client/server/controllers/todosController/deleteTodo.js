const mysql = require("mysql2");
require("dotenv").config();
const { todoDeleteSchema } = require("../../model/todoDeleteSchema");

const config = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DATABASE,
};

const pool = mysql.createPool(config);

const deleteTodo = function deleteTodo(req, res) {
  let id = req.loggedInUser.id;
  const { todo_id } = req.body;

  let validation = todoDeleteSchema.validate(req.body);
  if (validation.error) {
    return res
      .json({ message: validation.error.details[0].message })
      .status(406);
  }

  const sqlDeleteTodo = `
        DELETE FROM todos 
        WHERE todo_id = ? 
        AND id = ?
        ;`;

  pool.execute(sqlDeleteTodo, [todo_id, id], (error, result) => {
    if (error) {
      console.error("Error Sql Delete ->", error);
    } else {
      console.log("Delete result -> ", result);
      res.json({ message: "Todo Removed" }).status(204);
    }
  });
};

exports.deleteTodo = deleteTodo;
