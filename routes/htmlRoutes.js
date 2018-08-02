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

  app.get("/explore", function(req, res) {
    HauntedPlace.findAll({}).then(result => {
      res.render("places", {places: result});
    });
  });

  app.get('/explore/hauntedplace/id/review', (req, res) => {
    Type.findAll({}).then(result => {
      console.log(result)
      res.render("review", {types: result})
    });
  });

  app.get('/signup', (req, res) => {
    res.render('signup', {layout: 'form'});
  });

  app.get('/login', (req, res) => {
    res.render('login', {layout: 'form'});
  });

  app.get('/u/:username', (req, res) => {
    res.render('user', {layout: 'form'});
  });

  app.get('/explore/new', (req, res) => {
    res.render('newHauntedPlace', {layout: 'form'});
  });
};
