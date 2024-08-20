const { body, validationResult } = require("express-validator");
const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const signupGet = (req, res) => {
  res.render("sign-up");
};

const signupPost = asyncHandler(async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, async(err, hashedPassword) => {
    if (err) {
        return next(err);
    }
    await db.
  });
});
