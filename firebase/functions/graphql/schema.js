/** @format */

const { gql } = require('apollo-server-express');

const schema = gql`
	type history {
		email: String
		createdAt: String
		searchText: String
		url: String
	}

	type Query {
		getHistories(email: String): [history]
	}
`;

module.exports = schema;
