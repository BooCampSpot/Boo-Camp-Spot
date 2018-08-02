const db = require('../models');
const User = db.User;
const HauntedPlace = db.HauntedPlace;
const Review = db.Review;

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

  app.get('/u/:username', (req, res) => {
    User.findOne({
      where: {
        username: req.params.username.replace(/_/g, ' ')
      },
      include: [{
        model: HauntedPlace, 
        //required: true
      },
      {
        model: Review,
        //required: true
      }]
    }).then(result => {
      res.json(result);
    });
  });

  app.get('/explore/new', (req, res) => {
    res.render('newHauntedPlace', {layout: 'form'});
  });
};
