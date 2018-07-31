const passport = require('passport');
require('../config/passport')(passport);

const User = require('../models').User;

const signup = passport.authenticate('local-signup', {
  successRedirect: '/dashboard', // redir to dashboard
  failureRedirect: '/signup', // redir back to signup page if error
  failureFlash: true // aloow flash msg
});


// const aaa = User.create({
//   username: 'Anthony',
//   email: 'anthony123@gmail.com',
//   password: 'ndiejaedong7'
// }).then( user => {
//   console.log(user);
// }).catch(err => {
//   console.log(err);
// });

// User.findById(5).then(user => {
//   console.log(user.validPassword('ndiejaedong77'));
// });


module.exports = {
  signup
};