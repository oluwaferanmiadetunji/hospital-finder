/** @format */

const isEmpty = (string) => {
	if (string.trim() === '') return true;
	else return false;
};

const isEmail = (email) => {
	const regEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	if (email.match(regEx)) return true;
	else return false;
};

const isGreater = (string) => {
	if (string.length < 6) return true;
	else return false;
};

exports.validateSignUpData = (data) => {
	let errors = {};

	if (isEmpty(data.email)) {
		errors.email = 'Must not be empty';
	} else if (!isEmail(data.email)) {
		errors.email = 'Must be a valid email address';
	}
	if (isEmpty(data.password)) errors.password = 'Must not be empty';
	if (isGreater(data.password))
		errors.password = 'Password must have at least 6 characters';
	if (data.password !== data.confirmPassword)
		errors.confirmPassword = 'Passwords must match';
	if (isEmpty(data.name)) errors.name = 'Must not be empty';

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false,
	};
};

exports.validateLoginData = (data) => {
	let errors = {};

	if (isEmpty(data.password)) errors.password = 'Must not be empty';
	if (isEmpty(data.email)) errors.email = 'Must not be empty';

	return {
		errors,
		valid: Object.keys(errors).length === 0 ? true : false,
	};
};
