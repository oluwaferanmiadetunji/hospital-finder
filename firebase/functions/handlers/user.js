/** @format */

const { db } = require('../util/admin');

const firebaseConfig = require('../util/config');

const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);

const { validateSignUpData, validateLoginData } = require('../util/validators');

exports.signup = (req, res) => {
	const newUser = {
		email: req.body.email,
		password: req.body.password,
		confirmPassword: req.body.confirmPassword,
		name: req.body.name,
	};

	const { valid, errors } = validateSignUpData(newUser);
	if (!valid) return res.status(400).json(errors);

	let token, userId;
	db.doc(`/users/${newUser.email}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				return res.status(400).json({
					email: 'This email is already taken',
				});
			} else {
				return firebase
					.auth()
					.createUserWithEmailAndPassword(newUser.email, newUser.password);
			}
		})
		.then((data) => {
			userId = data.user.uid;
			return data.user.getIdToken();
		})
		.then((idToken) => {
			token = idToken;
			const userCredentials = {
				name: newUser.name,
				email: newUser.email,
				createdAt: new Date().toISOString(),
				userId,
			};
			return db.doc(`/users/${newUser.email}`).set(userCredentials);
		})
		.then(() => {
			return res.status(201).json({
				token: token,
				email: newUser.email,
			});
		})
		.catch((err) => {
			console.log(err);
			if (err.code === 'auth/email-already-in-use') {
				return res.status(400).json({
					email: 'Email is already in use',
				});
			} else {
				return res.status(500).json({
					general: 'Something went wrong! Please try again',
				});
			}
		});
};

exports.login = (req, res) => {
	const user = {
		email: req.body.email,
		password: req.body.password,
	};

	const { valid, errors } = validateLoginData(user);
	if (!valid) return res.status(400).json(errors);

	firebase
		.auth()
		.signInWithEmailAndPassword(user.email, user.password)
		.then((data) => {
			return data.user.getIdToken();
		})
		.then((token) => {
			return res.json({ token: token, email: user.email });
		})
		.catch((err) => {
			console.log(err);
			if (
				err.code === 'auth/wrong-password' ||
				err.code === 'auth/user-not-found'
			) {
				return res.status(400).json({
					general: 'Wrong credentials! Please, try again',
				});
			} else {
				return res.status(500).json({
					general: 'Something went wrong! Please try again',
				});
			}
		});
};
