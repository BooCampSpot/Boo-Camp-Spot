const express = require('express');
const router = express.Router();
const User = require('../models').User;
const HauntedPlace = require('../models').HauntedPlace;
const Review = require('../models').Review;
const passport = require('passport');
require('../config/passport');

// get all Users; auth admin required
router.get('/', passport.authenticate('auth-admin', {session: false}), (req, res) => {
  User.findAll({}).then(result => {
    res.json(result);
  });
});

// get one User, with its Haunted Places and Reviews; no auth required
router.get('/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: HauntedPlace, 
      required: true
    },
    {
      model: Review,
      required: true
    }]
  }).then(result => {
    res.json(result);
  });
});

// update User; auth admin required
router.put('/:id', passport.authenticate('auth-admin', {session: false}), (req, res) => {
  User.update({
    admin: req.body.admin 
  },
  {
    where: {
      id: req.params.id
    }
  }).then(result => {
    res.json(result); // 1 (successful)
  }).catch(err => {
    res.json(err);
  });;
});

// delete User; auth admin required
router.delete('/:id', passport.authenticate('auth-admin', {session: false}), (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => {
    res.json(result); // 1 (successful), 0 (unsuccessful)
  });
});

module.exports = router;