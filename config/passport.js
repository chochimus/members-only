const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../db/pool");
const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username", type: 1 });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password", type: 2 });
      }
      return done(null, user);
    } catch {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.userid);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE userid = $1", [
      id,
    ]);
    const user = rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});

function protectRoute(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/log-in?next=" + encodeURI(req.url));
}

module.exports = {
  passport,
  protectRoute,
};
