const db = require("../db/queries");
const { body, validationResult } = require("express-validator");
const { formatDistanceToNow } = require("date-fns");

const handleRootGet = (req, res) => {
  if (req.isAuthenticated()) {
    res.redirect("/homepage");
  } else {
    res.render("entry-page");
  }
};

const homepageViewGet = async (req, res) => {
  const messages = await db.getAllMessages();
  const processedMessages = messages.map((message) => ({
    ...message,
    timeAgo: formatDistanceToNow(new Date(message.timestamp), {
      addSuffix: true,
    }),
  }));
  res.render("homepage", {
    messages: processedMessages,
    user: req.user,
  });
};

//TODO complete create-message get

module.exports = {
  handleRootGet,
  homepageViewGet,
};
