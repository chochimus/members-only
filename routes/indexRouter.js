const { Router } = require("express");
const indexController = require("../controllers/indexController");
const indexRouter = Router();
const { protectRoute } = require("../config/passport");

indexRouter.get("/", indexController.handleRootGet);
indexRouter.get("/homepage", protectRoute, indexController.homepageViewGet);
//TODO complete /create-message route
//TODO complete /become-member route
module.exports = indexRouter;

// if logged in redirect to home, otherwise render root with links to log-in or sign-up
