/** @format */

const app = require('express')();
const { ApolloServer } = require('apollo-server-express');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());

const schema = require('./schema');
const resolvers = require('./resolvers');

const gqlServer = () => {
	app.use(bodyParser.json());

	app.use((error, req, res, next) => {
		const status = error.statusCode || 500;
		const message = error.message;
		const data = error.data;
		res.status(status).json({ message: message, data: data });
	});

	const apolloServer = new ApolloServer({
		typeDefs: schema,
		resolvers,
		// Enable graphiql gui
		introspection: true,
		playground: true,
	});

	apolloServer.applyMiddleware({ app, path: '/' });

	// // Then pass them to cors:
	// app.use(cors(corsOptions));

	return app;
};

module.exports = gqlServer;
