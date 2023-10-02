const express = require('express');
const router = express.Router();

const passport = require('passport')

router.get('/', (req, res, next) => {
    res.render('index');
})

router.get('/signup', (req, res, next) => {
    res.render('signup')
})

//Sin passport
// router.post('/signup', (req, res, next) => {
//     // console.log(req.body)
//     // res.send('recived');
//     // codigo de comprovación antes de usar passport
// })

router.post(
    '/signup',
    passport.authenticate(
        'local-signup',
        {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        passReqToCallback: true, // para pasarle todos los datos desde el cliente
        failureFlash: true  // Opcional, para mostrar mensajes de error flash

        }
    )
)

router.get('/signin', (req, res, next) => {})

router.post('/signin', passport.authenticate(
    'local-signin',
    {
        successRedirect: '/profile',
        failureRedirect: '/signup',
    }
))
router.get('/profile', (req, res, next) => {
    console.log('Hola')
    res.render('profile');
})


module.exports = router;