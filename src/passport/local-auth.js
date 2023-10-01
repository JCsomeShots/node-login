const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; // important to call Strategy
const User = require('../models/user')

passport.serializeUser((user, donde) => {
    
})


passport.use('local-signup', new LocalStrategy({
    useremailField: 'email', 
    passwordField: 'password', 
    passReqToCallback: true // to get the request qith the other fields
}, async (req,  email, password, done) => {
    const user = new User();
    user.name = req.name;
    user.email = email;
    user.password = password;
    await user.save();
    done(null, user);
}))