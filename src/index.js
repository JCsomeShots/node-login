const express = require('express');
const engine  = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');

// Initializations.
const app = express();
require('./database');

// Settings.
app.set('views', path.join(__dirname, 'views')); // To join with the actual dir
app.engine('ejs', engine); // Use like a template
app.set('view engine', 'ejs'); // setting with ejs
app.set('port', process.env.PORT || 3000); // use the system port or 3000


// Middlewares.
app.use(morgan('dev'));
app.use(express.urlencoded({
    extended: false
}));

// Routes.
app.use('/', require('./routes/index'));

// Starting the server.
app.listen(app.get('port'), () => {
    console.log("Server on Port", app.get('port'));
});