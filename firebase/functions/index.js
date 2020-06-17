/** @format */
const functions = require('firebase-functions');
const app = require('express')();
const FBAuth = require('./util/FBAuth');
const cors = require('cors');
app.use(cors());
const { signup, login } = require('./handlers/user');
const { addHistory } = require('./handlers/data');

// user routes
app.post('/signup', signup);
app.post('/login', login);
// History routes
app.post('/history', FBAuth, addHistory);

const gqlServer = require('./graphql/server');

const server = gqlServer();
exports.api = functions.https.onRequest(server);
exports.auth = functions.https.onRequest(app);
