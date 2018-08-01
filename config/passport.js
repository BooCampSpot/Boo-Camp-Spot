const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const HauntedPlace = require('../models').HauntedPlace;
const Review = require('../models').Review;

let opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
opts.passReqToCallback = true;

/* Strategies
auth-user: authenticate if user has valid token
auth-user-has-place: authenticate if user has valid token AND has Haunted Place specifed by req.params.id
auth-user-has-review: authenticate if user has valid token AND has Review specified by req.params.id
auth-admin: authenticate if user has valid token AND is admin
*/

passport.use('auth-user', new JWTStrategy(opts, (req, jwtPayload, cb) => {
  return cb(null, jwtPayload);
}));

passport.use('auth-user-has-place', new JWTStrategy(opts, (req, jwtPayload, cb) => {
  HauntedPlace.findOne({
    where: {
      id: req.params.id,
      UserId: jwtPayload.id
    }
  }).then(result => {
    return result ? cb(null, jwtPayload) : cb(null, false);
  });
}));

passport.use('auth-user-has-review', new JWTStrategy(opts, (req, jwtPayload, cb) => {
  Review.findOne({
    where: {
      id: req.params.id,
      UserId: jwtPayload.id
    }
  }).then(result => {
    return result ? cb(null, jwtPayload) : cb(null, false);
  });
}));

passport.use('auth-admin', new JWTStrategy(opts, (req, jwtPayload, cb) => {
  return jwtPayload.admin ? cb(null, jwtPayload) : cb(null, false);
}));