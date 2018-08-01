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
  Type.findAll({
    include: [{
      model: HauntedPlace, 
      required: true
    }]
  }).then(result => {
    res.json(result);
  });
});

// create Type; auth admin required
router.post('/', passport.authenticate('auth-admin', {session: false}), (req, res) => {
  Type.create({
    name: req.body.name,
  }).then(result => {
    res.json(result);
  }).catch(err => {
    res.json(err);
  });
});

// update Type; auth admin required
router.put('/:id', passport.authenticate('auth-admin', {session: false}), (req, res) => {
  Type.update({
    name: req.body.name,
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

// delete Type; auth admin required
router.delete('/:id', passport.authenticate('auth-admin', {session: false}), (req, res) => {
  Type.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => {
    res.json(result); // 1 (successful), 0 (unsuccessful)
  });
});

module.exports = router;