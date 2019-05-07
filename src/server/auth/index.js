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
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
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
    try {
      const user = await db.user.findByEmail(email);
      if (user) {
        return done(null, false);
      }

      const newUser = await db.user.create(
        email,
        password,
        req.body.username
      );

      done(null, newUser);
    } catch (e) {
      console.log(e);
      return done(null, false);
    }
  });
})));

// passport strategy for log in via username and password
passport.use('local-login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
(async (req, email, password, done) => {
  try {
    // check if there is an user in db with such username
    const user = await db.user.findByEmail(email);

    // if false - reject logging in
    if (!user) {
      return done(null, false);
    }

    if (!user.validPassword(password)) {
      return done(null, false);
    }

    return done(null, user);
  } catch (e) {
    return done(null, false);
  }
})));

module.exports = passport;
