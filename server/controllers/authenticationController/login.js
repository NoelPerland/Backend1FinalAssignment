const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

const login = function login(req, res) {
  const { username, password } = req.body;

  let validation = authSchema.validate(req.body);
  if (validation.error) {
    return res
      .json({ message: validation.error.details[0].message })
      .status(406);
  }

  const sqlUPassword = `
        Select id, username, password
        from users
        WHERE username = ?
      `;

  pool.execute(sqlUPassword, [username], (error, result) => {
    if (error) {
      console.error(error);
      res.sendStatus(500);
    }
    if (result.length < 1) {
      res.status(404).json({ message: "User Not Found" });
    } else {
      console.log("Login Result ->", result);
      const resPassword = result[0].password;
      const passCompare = bcrypt.compareSync(password, resPassword);

      if (passCompare) {
        let userCopy = Object.assign({}, result[0]);
        delete userCopy.password;

        const loginToken = jwt.sign(userCopy, process.env.DATABASE_SECRET, {
          expiresIn: 1000000,
        });

        // Cookie
        res.cookie("loginToken", loginToken, {
          maxAge: 1000000,
          sameSite: "none",
          httpOnly: true,
          // Secure
          secure: true,
        });

        res.json({ message: "Successful login" }).status(200);
        return;
      } else {
        res.json({ message: "Unsuccessful login" }).status(401);
      }
    }
  });
};

exports.login = login;
