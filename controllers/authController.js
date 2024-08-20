const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const bcrypt = require("bcryptjs");

const signupGet = (req, res) => {
  res.render("sign-up");
};

const signupPost = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          return reject(err);
        }
        resolve(hash);
      });
    });

    await db.insertUser({ username, password: hashedPassword });

    // Redirect or respond with success
    res.redirect("/login");
  } catch (err) {
    // Check if the error is a unique constraint violation
    if (err.code === "23505") {
      res.render("signup", {
        error: "Username already taken. Please choose another one.",
      });
    } else {
      // Handle other errors
      next(err);
    }
  }
};

module.exports = {
  signupGet,
  signupPost,
};
