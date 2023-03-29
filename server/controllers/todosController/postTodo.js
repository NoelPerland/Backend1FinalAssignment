const mysql = require("mysql2");
require("dotenv").config();
const { todoPostSchema } = require("../../model/todoPostSchmea");

const config = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DATABASE,
};

const pool = mysql.createPool(config);

const postTodo = function postTodo(req, res) {
  let id = req.loggedInUser.id;
  const { todo, completed } = req.body;

  let validation = todoPostSchema.validate(req.body);
  if (validation.error) {
    return res
      .json({ message: validation.error.details[0].message })
      .status(406);
  }

  const sqlNewTodo = `
        INSERT INTO todos(id, todo, completed) 
        VALUES(?,?,?)
        `;

  pool.execute(sqlNewTodo, [id, todo, completed], (error, result) => {
    if (error) {
      console.error("Post Err ->", error);
      res.sendStatus(500);
      return;
    } else {
      console.log("Post Res ->", result);
      res.status(201).json({ message: "New Todo Created!" });
      return;
    }
  });
};

exports.postTodo = postTodo;
