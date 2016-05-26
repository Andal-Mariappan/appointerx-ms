"use strict";
angular.module('eventx').factory('AppointmentService', function($resource) {

	var appointment = {};

	appointment = $resource('/api/appointments/:id', null, {
		'update': {
			method: 'PUT'
		},
		query: {
			method: 'GET',
			isArray: true
		}
	});

	appointment.byDocId = $resource('/api/appointments/docs/:docId', null, {
		query: {
			method: 'GET',
			params: {
				docId: '@docId'
			},
			isArray: true
		}
	});



	return appointment;

	// return $resource('/api/appointments/:id', {
	// 	id: '@_id'
	// }, {
	// 	'update': {
	// 		method: 'PUT'
	// 	}
	// }, {
	// 	query: {
	// 		method: 'GET',
	// 		isArray: true
	// 	}
	// }, {
	// 	getByDocId: {
	// 		method: 'GET',
	// 		isArray: true,
	// 		params: {
	// 			docId: 'me'
	// 		}
	// 	}
	// });
});