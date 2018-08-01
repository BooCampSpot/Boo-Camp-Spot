//===== Dependencies
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const passport = require('passport');
require('./config/passport');

//===== Database/Models
const db = require('./models');

//===== App
const app = express();
const PORT = process.env.PORT || 3000;

//===== Load Routes
const authRoutes = require('./routes/authRoutes');
// const userRoutes = require('./routes/userRoutes');
const typeRoutes = require('./routes/typeRoutes');
const hauntedPlaceRoutes = require('./routes/hauntedPlaceRoutes');


//===== Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

//===== Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//===== Use Routes
app.use('/auth', authRoutes);
app.use('/api/v1/HauntedPlaces', hauntedPlaceRoutes);
app.use('/api/v1/Types', typeRoutes);

// app.use('/user', passport.authenticate('jwt', {session: false}), userRoutes);

// Routes
// require("./routes/apiRoutes")(app);
// require("./routes/hauntedPlaceRoutes")(app);
// require("./routes/reviewRoutes")(app);
// require("./routes/htmlRoutes")(app);
// require('./routes/typeRoutes')(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
