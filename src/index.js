const express = require('express');
const engine  = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

// Initializations.
const app = express();
require('./database');
require('./passport/local-auth');

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
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false // no inicializacion previa
}))
app.use(flash()) // Usar antes de passport y despues de sessions
app.use(passport.initialize())
app.use(passport.session());

// Message.
app.use((req, res, next) => {
    app.locals.signupMessage = req.flash('signupMessage') //app.locals para variables globales
    next();
})

// Routes.
app.use('/', require('./routes/index'));

// Starting the server.
app.listen(app.get('port'), () => {
    console.log("Server on Port", app.get('port'));
});