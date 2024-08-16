const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();

indexRouter.get("/", indexController.indexMessagesGet);

module.exports = indexRouter;

// if logged in redirect to home, otherwise render root with links to log-in or sign-up
