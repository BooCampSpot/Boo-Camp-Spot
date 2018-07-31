const express = require('express');
const router = express.Router();
const User = require('../models').User;

// const passport = require('passport');
// require('../config/passport')(passport);

router.post('/signup', (req, res) => {
  (async() =>  {
    const userSameUsername = await User.findOne({where: {username: req.body.username}});
    const userSameEmail = await User.findOne({where: {email: req.body.email}});

    if (userSameUsername) {
      return res.json({error: 'same username'});
    } else if (userSameEmail) {
      return res.json({error: 'same email'});
    } else {
      try {
        const newUser = await User.create({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        });
        return res.json({user: newUser});
      } catch(e) {
        return res.json({error: e.errors});
      };
    };
  })();
});

// router.post('/signup', passport.authenticate('local-signup', {
//   successRedirect: '/dashboard', // redir to dashboard
//   failureRedirect: '/signup', // redir back to signup page if error
// }));

module.exports = router;