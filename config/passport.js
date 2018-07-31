const LocalStrategy = require('passport-local').Strategy;
const User = require('../models').User;

// User.create({
//   username: 'Anthony',
//   email: 'anthony.t.sin@gmail.com',
//   password: 'password'
// }).then( user => {
//   console.log(user);
// });

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

  // using named strategies for login and signup
  // if there was no name, it would be called 'local'
  passport.use('local-signup', new LocalStrategy({
    // local strategy uses username and password by default
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass req to callback
  },
  (req, username, password, done) => {
    
  }));
}
