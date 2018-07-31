const express = require('express');
const router = express.Router();
const jwt = require('../config/jwt');
const HauntedPlace = require('../models').HauntedPlace;

router.get('/', (req, res) => {
  HauntedPlace.findAll({}).then(result => {
    res.json(result);
  });
});

router.get('/:id', (req, res) => {
  HauntedPlace.findOne({
    where: {
        id: req.params.id
    }
  }).then(result => {
    res.json(result);
  });
});

router.post('/', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader.split(' ')[1].trim();

  // isAuthenticated

  const decoded = jwt.decodeToken(token);
  console.log(decoded.authenticated);

  HauntedPlace.create({
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
    UserId: req.body.UserId,
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

router.put('/:id', (req, res) => {
  HauntedPlace.update({
    name: req.body.name,
    description: req.body.description,
    location: req.body.location,
    UserId: req.body.UserId,
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

router.delete('/:id', (req, res) => {
  HauntedPlace.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => {
    res.json(result); // 1 (successful), 0 (unsuccessful)
  });
});

module.exports = router;