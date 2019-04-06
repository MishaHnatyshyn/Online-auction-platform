const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');
const db = require('../db/index.js');

// serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize user
passport.deserializeUser((id, done) => {
  db.user.getById(id)
    .then((user) => {
      done(null, user)
    })
    .catch((err) => {
      done(err, null)
    });
});

// passport strategy for sing up via username and password
passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  ((req, email, password, done) => {
    // make function asynchronous
    process.nextTick(async () => {
      // chek if username already exist
      const user = await db.user.findByEmail(email);
      if (user) {
        return done(null, false);
      }

      const newUser = new User();

      newUser.email = email;
      newUser.password = newUser.generateHash(password);

      // save user in db
      newUser.save((err) => {
        if (err) throw err;
        return done(null, newUser);
      });
    });
  })));

// passport strategy for log in via username and password
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  (async (req, email, password, done) => {
    // check if there is an user in db with such username
    const user = await db.user.findByEmail(email);

    // if false - reject logging in
    if (!user) {
      db.log.addLog(req.ip, 'Login failed, wrong username', req.ip);
      return done(null, false);
    }

    if (!user.validPassword(password)) {
      return done(null, false);
    }

    return done(null, user);

  })));

module.exports = passport;
