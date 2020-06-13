/** @format */

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
const app = express();
admin.initializeApp();
app.use(cors());
const db = admin.firestore();

app.get('/search', (req, res) => {
	db.collection('search')
		.orderBy('createdAt', 'desc')
		.get()
		.then((data) => {
			const results: any = [];
			data.forEach((doc) => {
				results.push({
					text: doc.data().text,
					createdAt: doc.data().createdAt,
					url: doc.data().url,
				});
			});
			return res.json(results);
		})
		.catch((err) => console.error(err));
});

app.post('/search', (req, res) => {
	const newSearch = {
		text: req.body.text,
		url: req.body.url,
		createdAt: new Date().toISOString(),
	};
	db.collection('search')
		.add(newSearch)
		.then(() => res.status(200).json({ message: 'Added' }))
		.catch((err) => {
			res.status(500).json({ error: 'Something went wrong' });
			console.log(err);
		});
});

exports.api = functions.https.onRequest(app);
