const express = require("express");
const session = require("express-session");
const passport = require("passport");
const path = require("node:path");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const indexRouter = require("./routes/indexRouter");
const app = express();
const pool = require("./db/pool");
const authRouter = require("./routes/authRoutes");
const pgSession = require("connect-pg-simple")(session);
const unescapeHTML = require("./utils/unescape");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: new pgSession({
      pool: pool,
      tableName: "session",
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.session());
require("./config/passport");

app.use((req, res, next) => {
  res.locals.unescapeHTML = unescapeHTML;
  next();
});

app.use("/", indexRouter);
app.use("/", authRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.statusCode || 500).send(err);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
