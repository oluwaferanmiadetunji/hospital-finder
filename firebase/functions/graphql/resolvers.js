/** @format */

const { db } = require('../util/admin');

const resolverFunctions = {
	Query: {
		getHistories: (_, { email }) => {
			return db
				.collection('history')
				.where('email', '==', `${email}`)
				.get()
				.then((snapshot) => {
					const docs = snapshot.empty
						? []
						: snapshot.docs.map((doc) => {
								return { id: doc.id, ...doc.data() };
						  });
					return docs;
				});
		},
	},
};

module.exports = resolverFunctions;
