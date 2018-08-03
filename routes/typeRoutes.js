const express = require('express');
const router = express.Router();
const Type = require('../models').Type;
const HauntedPlace = require('../models').HauntedPlace;
const passport = require('passport');
require('../config/passport');

// get all Types; no auth required
router.get('/', (req, res) => {
  Type.findAll({}).then(result => {
    res.json(result);
  });
});

// get one Type, with its Haunted Places; no auth required
router.get('/:id/HauntedPlaces', (req, res) => {
  Type.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: HauntedPlace
    }]
  }).then(result => {
    res.json(result);
  });
});


module.exports = router;