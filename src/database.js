const mongoose = require('mongoose');
const {mongodb} = require('./keys');

mongoose.connect(mongodb.URI, {})// primer parametro dirección y segundo objeto de config
    .then(db =>console.log('Database is connected'))
    .catch(err => console.error(err));