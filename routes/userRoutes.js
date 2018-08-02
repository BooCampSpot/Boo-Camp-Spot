const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const User = require('../models').User;
const HauntedPlace = require('../models').HauntedPlace;
const Review = require('../models').Review;

// get one User, with its Haunted Places and Reviews; no auth required
router.get('/:username', (req, res) => {
  User.findOne({
    where: {
      username: req.params.username.replace(/_/g, ' ')
    },
    include: [{
      model: HauntedPlace, 
    },
    {
      model: Review,
    }],
    attributes: { exclude: ['password']}
  }).then(result => {
    res.json([
      result, 
      {gravatarUrl: gravatar.url(result.email, {protocol: 'https'})}
    ]);
  });
});

module.exports = router;