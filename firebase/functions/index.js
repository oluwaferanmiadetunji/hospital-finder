/** @format */

const functions = require('firebase-functions');
const app = require('express')();
const FBAuth = require('./util/FBAuth');

const cors = require('cors');
app.use(cors());

const { signup, login } = require('./handlers/user');
const { getAllHistory, addHistory } = require('./handlers/data');
// user routes
app.post('/signup', signup);
app.post('/login', login);

// History routes
app.get('/history', getAllHistory);
app.post('/history', FBAuth, addHistory);

exports.api = functions.https.onRequest(app);
