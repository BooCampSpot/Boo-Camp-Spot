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
const userRoutes = require('./routes/userRoutes');
const typeRoutes = require('./routes/typeRoutes');
const hauntedPlaceRoutes = require('./routes/hauntedPlaceRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const adminRoutes = require('./routes/adminRoutes');

//===== Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

//===== Handlebars
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//===== Use Routes
app.use('/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/types', typeRoutes);
app.use('/api/v1/hauntedplaces', hauntedPlaceRoutes);
app.use('/api/v1/hauntedplaces/:haunted_place_id/reviews', reviewRoutes);
app.use('/api/admin', passport.authenticate('auth-admin', {session: false}), adminRoutes);

require("./routes/htmlRoutes")(app);

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
