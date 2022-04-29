const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const createError = require('http-errors');

const app = express();

cors = require('cors');

// Configures the database
const dbConfig = require('./api/config/mongodb.config.js');

const args = process.argv;
let database;

if (args.includes('--prod=true')) {
    database = dbConfig.urlProd;
    console.log('Using production connection string.');
} else {
    database = dbConfig.url;
    console.log('Using local connection string.');
}

// Connects to the database
mongoose.Promise = global.Promise;
mongoose
    .connect(database, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => {
        console.log('Successfully connected to MongoDB.');
    })
    .catch((error) => {
        console.log('Could not connect to MongoDB. Error: ' + error);
        process.exit();
    });

// Load express
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    }),
);
app.use(cors());

// Load routes
require('./api/routes/user.routes.js')(app);

// Creates server
const server = app.listen(3000, function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log('App listening at http://%s:%s', host, port);
});

// 404 Handler
app.use((request, response, next) => next(createError(404, "This route don't exist.", { expose: false })));

// Error handler
app.use(function (error, request, response, next) {
    console.error(error.message);
    if (!error.statusCode) error.statusCode = 500;
    response.status(error.statusCode).send(error.message);
});
