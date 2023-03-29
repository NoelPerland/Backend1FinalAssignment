const mysql = require("mysql2");
const bcrypt = require("bcrypt");
require("dotenv").config();
//joi validation
const { authSchema } = require("../../model/authSchema");

// MySql Configs
const config = {
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DATABASE,
};

const pool = mysql.createPool(config);

const register = function (req, res) {
  const { username, password } = req.body;

  let validation = authSchema.validate(req.body);
  if (validation.error) {
    return res
      .json({ message: validation.error.details[0].message })
      .status(406);
  }

  const salt = bcrypt.genSaltSync(10);
  const cryptedPassword = bcrypt.hashSync(password, salt);

  const sql = `
    INSERT INTO users(username, password)
    VALUES(?, ?)
    `;

  pool.execute(sql, [username, cryptedPassword], (error, result) => {
    if (error) {
      console.error("SQL Register ->", error);
      res.sendStatus(500);
    } else {
      console.log("Register -> ", result);
      res.json({ message: "New User Added", result: result }).status(200);
    }
  });
};

exports.register = register;
