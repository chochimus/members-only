const { Router } = require("express");
const authController = require("../controllers/authController");
const authRouter = Router();

authRouter.get("/sign-up", authController.signupGet);
authRouter.post("/sign-up", authController.signupPost);

module.exports = authRouter;
