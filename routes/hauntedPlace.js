var dataBase = require('../models');

module.exports = function (req, res) {
    app.get('/api/HauntedPlaces', function(HauntedPlaces){
        dataBase.HauntedPlaces.findAll({}).then(function(dataBase_HauntedPlaces){
            res.json(dataBase_HauntedPlaces);
        })
    });
    app.post('/api/HauntedPlaces', function(HauntedPlaces){
        dataBase.HauntedPlaces.create(req.body).then(function(dataBase_HauntedPlaces){
            res.json(dataBase_HauntedPlaces);
        })
    });
    app.delete('/api/HauntedPlaces/:id', function(dataBase_HauntedPlaces){
        dataBase_HauntedPlaces.destroy(req.body).then(function(dataBase_HauntedPlaces){
            res.json(dataBase_HauntedPlaces);
        });
    });
}
//hello