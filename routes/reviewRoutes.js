var dataBase = require('../models');

module.exports = function (app, res) {
    // This will get all reviews
    app.get('/api/Review', function (req, res) {
        dataBase.HauntedPlaces.findAll({}).then(function (dataBase_HauntedPlaces) {
            res.json(dataBase_HauntedPlaces);
        });
    });
    //This allows the user to post new Reviews.
    app.post('/api/Review', function (req, res) {
        dataBase.HauntedPlaces.create(req.body).then(function (dataBase_HauntedPlaces) {
            res.json(dataBase_HauntedPlaces);
        });
    });
    //This allows the user to delete one of the reviews. 
    app.delete('/api/Review/:id', function (req, res) {
        dataBase.HauntedPlaces.destroy({ where: { id: req.params.id } }).then(function (dataBase_HauntedPlaces) {
            res.json(dataBase_HauntedPlaces);
        });
    });
    //Render a 404 error 
    app.get('*', function (req, res) {
        res.render('404 Error');
    });
}