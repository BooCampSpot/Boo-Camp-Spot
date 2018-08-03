const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const User = require('../models').User;
const HauntedPlace = require('../models').HauntedPlace;
const Review = require('../models').Review;
const Type = require('../models').Type;

// get one User, with its Haunted Places and Reviews; no auth required
router.get('/:username', (req, res) => {
  User.findOne({
    where: {
      username: req.params.username.replace(/_/g, ' ')
    },
    include: [{
      model: HauntedPlace,
      include: [Type] 
    },
    {
      model: Review,
      include: [HauntedPlace] 
    }],
    attributes: { exclude: ['password']}
  }).then(result => {
    if(result) {
      res.json([
        result, 
        {gravatarUrl: gravatar.url(result.email, {protocol: 'https'})}
      ]);
    } else {
      res.json(result);
    };
  });
});

module.exports = router;