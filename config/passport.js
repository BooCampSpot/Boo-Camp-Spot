const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const HauntedPlace = require('../models').HauntedPlace;

let opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
opts.passReqToCallback = true;


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

// auth-user-has-review

passport.use('auth-admin', new JWTStrategy(opts, (req, jwtPayload, cb) => {
  return jwtPayload.admin ? cb(null, jwtPayload) : cb(null, false);
}));