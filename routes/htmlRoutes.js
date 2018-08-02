var db = require("../models");
const HauntedPlace = db.HauntedPlace;
const Type=db.Type;

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
  

  app.get("/explore/new", function(req, res) {
      res.render("review");
    });
  
};
