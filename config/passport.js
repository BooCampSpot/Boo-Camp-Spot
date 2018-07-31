const LocalStrategy = require('passport-local').Strategy;
const User = require('../models').User;

module.exports = (passport) => {
  // passport session setup
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session

  passport.serializeUser((user, done) => {
    done(null, user.id);
  }); 
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass req to callback
  },
  (req, username, password, done) => {
    // req.body -> username, email, password
    return done(null, true);
    // (async() =>  {
    //   const userSameUsername = await User.findOne({where: {username: username}});
    //   const userSameEmail = await User.findOne({where: {email: req.body.email}});

    //   if (userSameUsername) {
    //     return done(null, false, {message: 'same username'});
    //   } else if (userSameEmail) {
    //     return done(null, false);
    //   } else {
    //     try {
    //       const newUser = await User.create({
    //         username: username,
    //         email: req.body.email,
    //         password: password
    //       });
    //       return done(null, true); //??
    //     } catch(e) {
    //       // console.log(e);
    //       return done(null, false);
    //     };
    //   };
    // })();
  }));
}
