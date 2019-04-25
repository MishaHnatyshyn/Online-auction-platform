const express = require('express');// express framework
const bodyParser = require('body-parser');// post body-parser library
const session = require('express-session');
const http = require('http');
const mongoose = require('mongoose');// library for MongoDB
const compression = require('compression');// library for gzip static data
const cookieParser = require('cookie-parser');// cookie-parser library
const passport = require('./auth');// authorization library
const router = require('./routers/main');// main router
const {
  port, database, sessionSecret
} = require('./config');
// server configuration data
const { user, password } = database;

const app = express();

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('dist', { maxAge: '1d' }));
app.use(express.static('static', { maxAge: '1d' }));
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(router)

mongoose.connect(`mongodb://${user}:${password}@ds133256.mlab.com:33256/epam-auction-webservice`, { useNewUrlParser: true });

app.listen(port)
