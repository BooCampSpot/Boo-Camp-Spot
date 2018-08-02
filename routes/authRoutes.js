const express = require('express');
const router = express.Router();
const jwt = require('../config/jwt');
const User = require('../models').User;
const passport = require('passport');
require('../config/passport');

router.get('/user', passport.authenticate('auth-user', {session: false}), (req, res) => {
  res.json(req.user);
});

router.post('/signup', (req, res) => {
  (async() =>  {
    const userSameUsername = await User.findOne({where: {username: req.body.username}});
    const userSameEmail = await User.findOne({where: {email: req.body.email}});

    if (userSameUsername) {
      return res.json({error: 'Username already taken!'});
    } else if (userSameEmail) {
      return res.json({error: 'User with this email already exists!'});
    } else {
      try {
        const newUser = await User.create({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        });
        return res.json({accessToken: jwt.createToken(newUser)});
      } catch(e) {
        return res.json({error: e.errors});
      };
    };
  })();
});

router.post('/login', (req, res) => {
  (async() => {
    const usernameOrEmail = req.body.usernameOrEmail;
    const password = req.body.password;
    let user;

    user = await User.findOne({where: {username: usernameOrEmail}});
    if (!user) user = await User.findOne({where: {email: usernameOrEmail}});

    if (user && user.validPassword(password)) {
      return res.json({
        accessToken: jwt.createToken(user),
        username: user.username
      });
    } else if (user && !user.validPassword(password)) {
      return res.json({error: 'Invalid Password!'});
    } else {
      return res.json({error: 'Could not find user.'});
    };
  })();
});

module.exports = router;