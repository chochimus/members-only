const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const handleRootGet = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/homepage");
  } else {
    res.render("entry-page");
  }
};

const homepageViewGet = (req, res) => {
  res.render("homepage");
};

module.exports = {
  handleRootGet,
  homepageViewGet,
};
