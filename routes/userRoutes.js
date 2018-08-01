const express = require('express');
const router = express.Router();
const User = require('../models').User;
const HauntedPlace = require('../models').HauntedPlace;
const Review = require('../models').Review;

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

module.exports = router;