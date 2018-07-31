var dataBase = require('../models');

module.exports = function (req, res) {
    //This gets all of the Haunted Places. 
    app.get('/api/HauntedPlaces', function(HauntedPlaces){
        dataBase.HauntedPlaces.findAll({}).then(function(dataBase_HauntedPlaces){
            res.json(dataBase_HauntedPlaces);
        })
    });
    //This allows the user to post new Haunted Places.
    app.post('/api/HauntedPlaces', function(HauntedPlaces){
        dataBase.HauntedPlaces.create(req.body).then(function(dataBase_HauntedPlaces){
            res.json(dataBase_HauntedPlaces);
        })
    });
    //This allows the user to delete one of the haunted places. 
    app.delete('/api/HauntedPlaces/:id', function(dataBase_HauntedPlaces){
        dataBase_HauntedPlaces.destroy(req.body).then(function(dataBase_HauntedPlaces){
            res.json(dataBase_HauntedPlaces);
        });
    });
}