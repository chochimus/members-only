const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();
const { protectRoute } = require("../config/passport");

indexRouter.get("/", indexController.handleRootGet);
indexRouter.get("/homepage", indexController.homepageViewGet);
module.exports = indexRouter;

// if logged in redirect to home, otherwise render root with links to log-in or sign-up
