const mysql = require("mysql2");
require("dotenv").config();
const { todoPatchSchema } = require("../../model/todoPatchSchema");

const config = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DATABASE,
};

const pool = mysql.createPool(config);

const patchTodo = function patchTodo(req, res) {
  let id = req.loggedInUser.id;
  const { todo_id, completed } = req.body;

  let validation = todoPatchSchema.validate(req.body);
  if (validation.error) {
    return res
      .json({ message: validation.error.details[0].message })
      .status(406);
  }

  const sqlTodoCompleted = `
        UPDATE todos 
        SET completed = ? 
        WHERE todo_id= ? 
        AND id = ? 
        `;

  pool.execute(sqlTodoCompleted, [completed, todo_id, id], (error, result) => {
    if (error) {
      console.error("Error sql Patch -> ", error);
      res.sendStatus(500);
      return;
    } else {
      console.log("Patch result -> ", result);
      res.status(200).json({ message: "Patch Completed!" });
      return;
    }
  });
};

exports.patchTodo = patchTodo;
