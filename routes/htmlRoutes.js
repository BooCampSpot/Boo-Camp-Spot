const db = require('../models');
const User = db.User;
const HauntedPlace = db.HauntedPlace;
const Review = db.Review;
const Type = db.Type;
const placesController = require('../controllers/placesController');

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
    HauntedPlace.findAll({
      include: [{
        model: Type
      }]
    }).then(result => {
      let places = [];

      for(const place of result) {
        places.push({
          imgLink: `/images/HP-${Math.floor(Math.random()*12)+1}.jpg`,
          urlLink: `/p/${place.name.replace(/ /g, '_')}`,
          name: place.name,
          location: place.location,
          type: place.Type.name
        });
      };
      res.render("places", {places: places});
    });
  });

  app.get('/explore/new', (req, res) => {
    res.render('newHauntedPlace');
  });

  app.get('/explore/:type', (req, res) => {
    Type.findOne({
      where: {
        name: req.params.type.replace(/_/g, ' ')
      }
    }).then(type => {
      if (type) {
        HauntedPlace.findAll({
          where: {
            TypeId: type.id
          }
        }).then(result => {
          let places = [];

          for(const place of result) {
            places.push({
              imgLink: `/images/HP-${Math.floor(Math.random()*12)+1}.jpg`,
              urlLink: `/p/${place.name.replace(/ /g, '_')}`,
              name: place.name,
              location: place.location,
              type: type.name
            });
          };
          res.render("places", {places: places});
        });
      } else {
        res.redirect('/home');
      };
    });
  });

  app.get('/u/:username', (req, res) => {
    res.render('user');
  });

  app.get('/u/:username/quickreview', (req, res) => {
    res.render('review');
  });

  app.get('/p/:haunted_place', (req, res) => {
    HauntedPlace.findOne({
      where: {
        name: req.params.haunted_place.replace(/_/g, ' ')
      },
      include: [{
        model: Review,
        include: [User]
      }]
    }).then(place => {
      if (place) {
        placesController.getImageLink(place.name).then(link => {
          res.render('hauntedPlace', {place: place, link: link});
        });
      } else {
        res.redirect('/home');
      };
    });
  });

  app.get('*', (req, res) => {
    res.render('404');
  });
};
