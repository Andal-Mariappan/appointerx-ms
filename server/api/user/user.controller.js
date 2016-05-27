'use strict';

import {
	User
} from '../../sqldb';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';
import {
	Appointment
} from '../../sqldb';

import async from 'async';
import crypto from 'crypto';

var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var options = {
	auth: {
		api_user: 'azure_f010f90d1465e1671b9f222982f063e0@azure.com',
		api_key: 'bullen1114'
	}
}
var client = nodemailer.createTransport(sgTransport(options));

function validationError(res, statusCode) {
	statusCode = statusCode || 422;
	return function(err) {
		res.status(statusCode).json(err);
	}
}

function handleError(res, statusCode) {
	statusCode = statusCode || 500;
	return function(err) {
		res.status(statusCode).send(err);
	};
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
	User.findAll({
			attributes: [
				'_id',
				'first_name',
				'last_name',
				'email',
				'role',
				'npi',
				'provider'
			]
		})
		.then(users => {
			res.status(200).json(users);
		})
		.catch(handleError(res));
}

export function getPhysicians(req, res) {
	User.findAll({
			where: {
				"role": "physician"
			},
			attributes: [
				'_id',
				'first_name',
				'last_name',
				'email',
				'role',
				'npi',
				'provider'
			]
		})
		.then(users => {
			res.status(200).json(users);
		})
		.catch(handleError(res));
}

export function getPhysiciansData(req, res) {
	User.findAll({
			where: {
				"role": "physician"
			},
			attributes: [
				'_id',
				'first_name',
				'last_name',
				'email',
				'npi',
				'mobile'
			],
			include: [{
				model: Appointment,
				attributes: ['title', 'start', 'end', '_id'],
				include: [{
					model: User,
					as: 'Patient',
					attributes: ['first_name', 'last_name', 'email', 'mobile', 'gender', '_id']
				}]
			}]
		})
		.then(users => {
			res.status(200).json(users);
		})
		.catch(handleError(res));
}
export function getPatients(req, res) {
	User.findAll({
			where: {
				"role": "patient"
			},
			attributes: [
				'_id',
				'first_name',
				'last_name',
				'email',
				'mobile'
			]
		})
		.then(users => {
			res.status(200).json(users);
		})
		.catch(handleError(res));
}

/**
 * Creates a new user
 */
export function create(req, res, next) {
	var newUser = User.build(req.body);
	newUser.setDataValue('provider', 'local');
	newUser.setDataValue('role', req.body.role);
	newUser.save()
		.then(function(user) {
			var token = jwt.sign({
				_id: user._id
			}, config.secrets.session, {
				expiresIn: 60 * 60 * 5
			});
			res.json({
				token
			});
		})
		.catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
	var userId = req.params.id;

	User.find({
			where: {
				_id: userId
			}
		})
		.then(user => {
			if (!user) {
				return res.status(404).end();
			}
			res.json(user.profile);
		})
		.catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
	User.destroy({
			_id: req.params.id
		})
		.then(function() {
			res.status(204).end();
		})
		.catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res, next) {
	var userId = req.user._id;
	var oldPass = String(req.body.oldPassword);
	var newPass = String(req.body.newPassword);

	User.find({
			where: {
				_id: userId
			}
		})
		.then(user => {
			if (user.authenticate(oldPass)) {
				user.password = newPass;
				return user.save()
					.then(() => {
						res.status(204).end();
					})
					.catch(validationError(res));
			} else {
				return res.status(403).end();
			}
		});
}

export function forgotPassword(req, res, next) {
	if (!req.body.email) {
		return res.status(500).json({
			msg: 'Please enter a valid email address.',
			status: 'failure',
			err: errors
		});
	}

	var email = String(req.body.email);
	async.waterfall([
		function(done) {
			crypto.randomBytes(16, function(err, buf) {
				var token = buf.toString('hex');
				done(err, token);
			});
		},
		function(token, done) {

			User.find({
				where: {
					email: email
				},
				attributes: [
					'_id',
					'first_name',
					'last_name',
					'email',
					'password'
				]
			})
			.then(user => {
				if (!user) {
					return res.status(500).json({
						message: 'No account exists with the provided email address.',
						success: false
					});
				}
				user.resetToken = token;
				user.resetTokenExpires = Date.now() + 3600000; // 1 hour

				user.save()
					.then(() => {
						done(null, token, user);
					}).catch(() => {
						done(null, token, user);
					});
			});
		},
		function(token, user, done) {
			var email = {
				from: 'mike@globalhealthusa.com',
				to: user.email,
				subject: 'Forgot Password',
				text: 'You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n' +
					'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
					'http://' + req.headers.host + '/reset/' + token + '\n\n' +
					'If you did not request this, please ignore this email and your password will remain unchanged.\n',
				html: 'You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n' +
					'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
					'http://' + req.headers.host + '/reset/' + token + '\n\n' +
					'If you did not request this, please ignore this email and your password will remain unchanged.\n'
			};


			client.sendMail(email, function(err, info) {
				console.dir(info);
				done(err, 'done');
			});
		}
	], function(err, result) {
		if (err) {
			return res.status(500).json({
				message: 'Error! Please try again.',
				success: false,
				err: err
			});
		}
		return res.status(200).json({
			success: true,
			message: 'An e-mail has been sent to ' + req.body.email.toLowerCase() + ' with further instructions.'
		});
	});
}
/**
 * Get my info
 */
export function me(req, res, next) {
	var userId = req.user._id;

	User.find({
			where: {
				_id: userId
			},
			attributes: [
				'_id',
				'first_name',
				'last_name',
				'email',
				'role',
				'npi',
				'provider'
			]
		})
		.then(user => { // don't ever give out the password or salt
			if (!user) {
				return res.status(401).end();
			}
			res.json(user);
		})
		.catch(err => next(err));
}


/**
 * Password reset
 * @param object req
 * @param object res
 * @param object next
 * @returns {undefined}
 */
export function resetPassword(req, res, next) {
	User.find({
			where: {
				resetToken: req.params.token,
				resetTokenExpires: {
					$gt: Date.now()
				}
			}
		})
		.then(user => { // don't ever give out the password or salt
			if (!user) {
				return res.status(401).json({
					message: 'user not found.',
					success: false,
					reason: 'expire'
				});
			}

			user.password = req.body.password;
			user.resetToken = null;
			user.resetTokenExpires = null;
			return user.save()
				.then(() => {
					res.status(204).json({
						message: 'pass reset done',
						success: true

					});
				})
				.catch(validationError(res));
		})
		.catch(err => next(err));

}

/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
	res.redirect('/');
}