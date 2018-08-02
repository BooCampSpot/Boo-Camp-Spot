var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get('/signup', (req, res) => {
    res.render('signup', {layout: 'form'});
  });

  app.get('/login', (req, res) => {
    res.render('login', {layout: 'form'});
  });

  app.get('/explore/new', (req, res) => {
    res.render('newHauntedPlace', {layout: 'form'});
  });
};
