var dataBase = require('../models');

module.exports = function (req, res) {
    //This gets all of the Haunted Places. 
    app.get('/api/HauntedPlaces', function(req, res){
        dataBase.HauntedPlaces.findAll({}).then(function(dataBase_HauntedPlaces){
            res.json(dataBase_HauntedPlaces);
        })
    });
    //This allows the user to post new Haunted Places.
    app.post('/api/HauntedPlaces', function(req, res){
        dataBase.HauntedPlaces.create(req.body).then(function(dataBase_HauntedPlaces){
            res.json(dataBase_HauntedPlaces);
        })
    });
    //This allows the user to delete one of the haunted places. 
    app.delete('/api/HauntedPlaces/:id', function(req, res){
        dataBase.HauntedPlaces.destroy({ where: { id: req.params.id } }).then(function(dataBase_HauntedPlaces){
            res.json(dataBase_HauntedPlaces);
        });
    });
    //Render a 404 error 
    app.get('*', function(req, res){
        res.render('404 Error')
    })
}