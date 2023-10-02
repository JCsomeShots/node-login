const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; // important to call Strategy
const User = require('../models/user')

passport.serializeUser((user, done) => {
    done(null, user.id);
})
passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
})


passport.use(
    'local-signup',
    new LocalStrategy(
        {
            usernameField: 'email', 
            passwordField: 'password', 
            passReqToCallback: true // to get the request with the other fields
        },
        async (req, email, password, done) => {

            // validation
            const user = User.findOne({email: email});
            if (user) {
                return done(null, false, req.flash('signupMessage', 'The email is already taken.'))
            } else {
                const newUser = new User();
                newUser.name = req.body.name;
                newUser.email = email;
                // user.password = password; para guardar el password en texto plano
                newUser.password = newUser.encryptPassword(password)
                await newUser.save();
                done(null, newUser);
            }

        }
    )
) 

passport.use(
    'local-signin',
    new LocalStrategy(
        {
            usernameField: 'email', 
            passwordField: 'password', 
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            const user = await User.findOne({email: email});
            if (!user) {
                return done(null, false, req.flash('signinMessage', 'No user found')) 
                // null, por que no es un error
                // false, por que no hay un retunr para el usuario

            } 

            if(!user.comparePassword(password)) {
                return done(null, false, req.flash('signinMessage', 'Incorrect Password'))
            }

            done(null, user)

        }
    )
)