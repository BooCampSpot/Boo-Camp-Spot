const db = require('../models');
const User = db.User;
const HauntedPlace = db.HauntedPlace;
const Review = db.Review;
const Type = db.Type;

module.exports = function(app) {

  app.get("/", function(req, res) {
      res.render("index", {layout: "landing"})
  });

  app.get("/home", function(req, res) {
    res.render("home");
  });

  app.get('/signup', (req, res) => {
    res.render('signup');
  });

  app.get('/login', (req, res) => {
    res.render('login');
  });

  app.get("/explore", function(req, res) {
    HauntedPlace.findAll({}).then(result => {
      res.render("places", {places: result});
    });
  });

  app.get('/u/:username', (req, res) => {
    res.render('user');
  });

  app.get('/u/:username/quickreview', (req, res) => {
    res.render('review');
  });

  app.get('/explore/new', (req, res) => {
    res.render('newHauntedPlace');
  });
};
