const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const handleRootGet = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/homepage");
  } else {
    res.render("entry-page");
  }
};

module.exports = {
  handleRootGet,
};
