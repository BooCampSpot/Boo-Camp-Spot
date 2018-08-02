var db = require("../models");

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get('/explore/new', function(req, res) {
    res.render('newHauntedPlace', {layout: 'form'});
  });
};
