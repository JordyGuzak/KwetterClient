const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect to database
mongoose.connect(config.database);

//On connection to database
mongoose.connection.on('connected', () => {
    console.log('Connected to database: ' + config.database);
});

//On error while connecting to database
mongoose.connection.on('error', (error) => {
    console.log('Database error: ' + error);
});

//Routes
const index = require('./routes/index');
const kweets = require('./routes/kweets');
const users = require('./routes/users');

const port = 3000;

const app = express();

//Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// CORS
app.use(cors());

//Body Parser
app.use(bodyParser.json());

//Passport
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//Mount routes
app.use('/', index);
app.use('/kweets', kweets);
app.use('/users', users);

app.listen(port, () => {
    console.log('Server started on port: ' + port);
});