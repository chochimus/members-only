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

const createMessageValidate = [
  body("messageTitle")
    .trim()
    .notEmpty()
    .withMessage("Title missing")
    .isLength({ max: 100 })
    .withMessage("Title must be less than 100 characters")
    .escape(),
  body("messageContent")
    .trim()
    .notEmpty()
    .withMessage("Message missing")
    .isLength({ max: 2000 })
    .withMessage("Title must be less than 2000 characters")
    .escape(),
];

const createMessagePost = [
  createMessageValidate,
  async (req, res, next) => {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      const messages = await db.getAllMessages();
      const processedMessages = messages.map((message) => ({
        ...message,
        timeAgo: formatDistanceToNow(new Date(message.timestamp), {
          addSuffix: true,
        }),
      }));
      return res.status(400).render("homepage", {
        messages: processedMessages,
        user: req.user,
        errors: errors.array(),
        inputData: req.body,
        showDialog: true,
      });
    }
    try {
      await db.createMessage({
        userid: req.user.userid,
        title: req.body.messageTitle,
        content: req.body.messageContent,
      });
      res.redirect("/homepage");
    } catch (err) {
      return next(err);
    }
  },
];

const deleteMessagePost = async (req, res, next) => {
  const { messageid } = req.params;
  try {
    await db.deleteMessageById({ messageid });
    res.redirect("/homepage");
  } catch (err) {
    return next(err);
  }
};

const joinMembersGet = async (req, res, next) => {
  res.render("become-member", {
    user: req.user,
  });
};

const joinMembersValidate = [body("memberPassword").escape()];
const joinMembersPost = [
  joinMembersValidate,
  async (req, res, next) => {
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("become-member", {
        user: req.user,
        errors: errors.array(),
      });
    }

    const { memberPassword } = req.body;
    const { membership_statusid: currentStatus, userid } = req.user;
    console.log(memberPassword, currentStatus);
    try {
      if (memberPassword === process.env.MEMBERS_CODE) {
        const statusInDb = await db.getMembershipStatus({ userid });
        if (statusInDb === currentStatus) {
          await db.updateStatus({ userid });
          res.redirect("/homepage");
        } else {
          res.render("become-member", {
            user: req.user,
            errors: [{ msg: "your status has already been updated" }],
          });
        }
      } else {
        res.render("become-member", {
          user: req.user,
          errors: [{ msg: "incorrect passcode" }],
        });
      }
    } catch (err) {
      return next(err);
    }
  },
];

module.exports = {
  handleRootGet,
  homepageViewGet,
  createMessagePost,
  deleteMessagePost,
  joinMembersGet,
  joinMembersPost,
};
