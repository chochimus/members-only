const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const handleRootGet = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/homepage");
  } else {
    res.render("entry-page");
  }
};

const homepageViewGet = async (req, res) => {
  const messages = await db.getAllMessages();
  res.render("homepage" + messages);
};

module.exports = {
  handleRootGet,
  homepageViewGet,
};
