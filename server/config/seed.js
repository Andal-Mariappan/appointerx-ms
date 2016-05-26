/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
var User = sqldb.User;

User.sync()
	.then(() => User.destroy({
		where: {}
	}))
	.then(() => {
		User.bulkCreate([{
				provider: 'local',
				first_name: 'patient',
				last_name: 'user1',
				email: 'user1@u.com',
				'gender': 'male',
				'mobile': '1234567890',
				'age': 12,
				password: 'test',
				role: 'patient'
			}, {
				provider: 'local',
				first_name: 'patient',
				last_name: 'user2',
				email: 'user2@u.com',
				'gender': 'male',
				'mobile': '1234567890',
				'age': 13,
				password: 'test',
				role: 'patient'
			}, {
				provider: 'local',
				first_name: 'patient',
				last_name: 'user3',
				email: 'user3@u.com',
				'gender': 'male',
				'mobile': '1234567890',
				'age': 14,
				password: 'test',
				role: 'patient'
			}, {
				provider: 'local',
				first_name: 'patient',
				last_name: 'user4',
				email: 'user4@u.com',
				'gender': 'male',
				'mobile': '1234567890',
				'age': 15,
				password: 'test',
				role: 'patient'
			}, {
				provider: 'local',
				first_name: 'physician',
				last_name: 'doc1',
				email: 'doc1@u.com',
				'gender': 'male',
				'mobile': '1234567890',
				'age': 23,
				npi:1234567890,
				password: 'test',
				role: 'physician'
			}, {
				provider: 'local',
				first_name: 'physician',
				last_name: 'doc2',
				email: 'doc2@u.com',
				'gender': 'male',
				'mobile': '1234567890',
				'age': 1,
				npi:1234567891,
				password: 'test',
				role: 'physician'
			}, {
				provider: 'local',
				first_name: 'physician',
				last_name: 'doc3',
				email: 'doc3@u.com',
				'gender': 'male',
				'mobile': '1234567890',
				'age': 2,
				npi:1234567892,
				password: 'test',
				role: 'physician'
			}, {
				provider: 'local',
				role: 'admin',
				first_name: 'Super',
				last_name: 'Admin',
				email: 'admin@example.com',
				password: 'admin'
			}], {
				returning: true
			})
			.then((users) => {
				console.log('finished populating users');
			});
	});