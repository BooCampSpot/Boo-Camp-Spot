const dataBase = require('../models');

module.exports = function (req, res) {
    //This gets all of the types. 
    app.get('/api/type', function(req, res){
        dataBase.type.findAll({}).then(function(dataBase_type){
            res.json(dataBase_type);
        })
    });
    //This is used to find a search for a single type. 
    app.get('/api/type/:id', function(req, res){
        dataBase.type.findOne({
            where: {
                id: req.params.id
            }
        }).then(function(response){
            res.json(response);
        })
    })
    // This has been commented out because we will not use it!
    //============================================================
    // //This allows the user to post new types.
    // app.post('/api/type', function(req, res){
    //     dataBase.type.create(req.body).then(function(dataBase_type){
    //         res.json(dataBase_type);
    //     })
    // });
    //============================================================
    //Render a 404 error 
    app.get('*', function(req, res){
        res.render('404 Error')
    })
}