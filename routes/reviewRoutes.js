const express = require('express');
const router = express.Router({ mergeParams: true });
const Review = require('../models').Review;
const passport = require('passport');
require('../config/passport');

/* Note in server.js, this module is being used like so:
app.use('/api/v1/HauntedPlaces/:haunted_place_id/Reviews', reviewRoutes);
AND router setting is express.Router({ mergeParams: true });
therefore, req.params.haunted_place_id is accessible in routes below
*/

// get all reviews belonging to :haunted_place_id; no auth required
router.get('/', (req, res) => {
  Review.findAll({
    where: {
      HauntedPlaceId: req.params.haunted_place_id
    }
  }).then(result => {
    res.json(result);
  });
});

// get one review belonging to :haunted_place_id; no auth required
router.get('/:id', (req, res) => {
  Review.findOne({
    where: {
      id: req.params.id,
      HauntedPlaceId: req.params.haunted_place_id
    }
  }).then(result => {
    res.json(result);
  });
});

// create review; auth user required
router.post('/', passport.authenticate('auth-user', {session: false}), (req, res) => {
  Review.create({
    title: req.body.title,
    body: req.body.body,
    rating: req.body.rating,
    UserId: req.user.id,
    HauntedPlaceId: req.params.haunted_place_id
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

// update review; auth user required -> review must belong to user
router.put('/:id', passport.authenticate('auth-user-has-review', {session: false}), (req, res) => {
  Review.update({
    title: req.body.title,
    body: req.body.body,
    rating: req.body.rating,
    // UserId: req.user.id,
    // HauntedPlaceId: req.params.haunted_place_id
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

// delete review; auth user required -> review must belong to user
router.delete('/:id', passport.authenticate('auth-user-has-review', {session: false}), (req, res) => {
  Review.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => {
    res.json(result); // 1 (successful), 0 (unsuccessful)
  });
});

module.exports = router;