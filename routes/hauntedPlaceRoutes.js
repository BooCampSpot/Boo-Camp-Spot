const express = require('express');
const router = express.Router();
const HauntedPlace = require('../models').HauntedPlace;
const passport = require('passport');
require('../config/passport');

// get all Haunted Places; no auth required
router.get('/', (req, res) => {
  HauntedPlace.findAll({}).then(result => {
    res.json(result);
  });
});

// get one Haunted Place (by Id); no auth required
router.get('/:id', (req, res) => {
  HauntedPlace.findOne({
    where: {
        id: req.params.id
    }
  }).then(result => {
    res.json(result);
  });
});

// create Haunted Place; auth user required
// note req.user comes from passport.authenticate(...)
router.post('/', passport.authenticate('auth-user', {session: false}), (req, res) => {
  HauntedPlace.create({
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
    UserId: req.user.id,
    TypeId: req.body.TypeId
  }).then(result => {
    res.json(result);
  }).catch(err => {
    if (err['errors']) { // validation error
      res.json({error: err['errors']});
    } else { // SQL error
      res.json({error: 'Invalid request.'});
    };
  });
});

// update Haunted Place; auth user required
// haunted place must belong to user
router.put('/:id', passport.authenticate('auth-user-has-place', {session: false}), (req, res) => {
  HauntedPlace.update({
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
    UserId: req.user.id,
    TypeId: req.body.TypeId
  },
  {
    where: {
      id: req.params.id
    }
  }).then(result => {
    res.json(result); // 1 (successful)
  }).catch(err => {
    if (err['errors']) { // validation error
      res.json({error: err['errors']});
    } else { // SQL error
      res.json({error: 'Invalid request.'});
    };
  });;
});

// update Haunted Place; auth user required
// haunted place must belong to user
router.delete('/:id', passport.authenticate('auth-user-has-place', {session: false}), (req, res) => {
  HauntedPlace.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => {
    res.json(result); // 1 (successful), 0 (unsuccessful)
  });
});

module.exports = router;