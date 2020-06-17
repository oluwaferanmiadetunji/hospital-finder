/** @format */

const { db } = require('../util/admin');

exports.getAllHistory = (req, res) => {
	db.collection('history')
		.orderBy('createdAt', 'desc')
		.get()
		.then((data) => {
			let history = [];
			data.forEach((doc) => {
				history.push({
					id: doc.id,
					email: doc.data().email,
					searchText: doc.data().searchText,
					url: doc.data().url,
					createdAt: doc.data().createdAt,
				});
			});
			return res.status(200).json(history);
		})
		.catch((err) => {
			return res.status(500).json({ error: err.code });
		});
};

exports.addHistory = (req, res) => {
	const history = {
		email: req.user.email,
		searchText: req.body.searchText,
		url: req.body.url,
		createdAt: new Date().toISOString(),
	};

	db.collection('history')
		.add(history)
		.then((doc) => {
			return res.status(201).json(history);
		})
		.catch((err) => {
			res.status(500).json({
				error: 'something went wrong',
			});
		});
};
