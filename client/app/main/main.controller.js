'use strict';

(function() {

	class MainController {

		constructor($http, $scope, $compile, socket, Auth, AppointmentService, User,Shifts) {
			var vm= this;
			this.$http = $http;
			this.awesomeThings = [];
			this.appointments = [];
			//this.slots=[];
			this.isLoggedIn = Auth.isLoggedIn;
			this.isAdmin = Auth.isAdmin;
			this.getCurrentUser = Auth.getCurrentUser;
			this.currentRole= this.getCurrentUser().role;
			this.defaultView= "agendaDay"
			this.currentDate= moment().format("dddd, MMMM Do YYYY");
			this.onChange = function() {
				this.physician = this.physician;
				this.filter_Calendar();
			}

			this.filter_Calendar = function() {
				getPhysician(this.physician);
				getShifts(this.physician);
			}
			User.getPhysicians().$promise.then(response => {
				this.physicians = response;
				this.physician = response[0]._id;
				getPhysician(this.physician);
				getShifts(this.physician);
				
			});
			
			function getPhysician(physicianId)
			{
				AppointmentService.byDocId.query({
					docId: physicianId
				}).$promise.then(function(response) {
					$scope.appointments = response;
					
					socket.syncUpdates('appointment', $scope.appointments);
				});
			}
			
			function getShifts(physicianId)
			{
				Shifts.byDocId({
					docId: physicianId
				}).$promise.then(function(shifts) {
					// give pure json object instead of $resource
					var newArr = JSON.parse(angular.toJson(shifts));
					vm.slots  = _.map(newArr, function(o) { return _.omit(o, '_id'); });
					socket.syncUpdates('shifts', vm.slots);
				});
			}
			
			this.exportCSV = function() {
				var dataToExport = [];
				var dataX = [];
				var columns = ['title', 'description', 'start', 'end',
					'Patient.first_name',
					'Patient.last_name',
					'Patient.email',
					'Patient.gender',
					'Patient.mobile',
					'Physician.first_name',
					'Physician.last_name',
					'Physician.email',
					'Physician.gender',
					'Physician.mobile',
				];
				dataToExport.push(columns);
				angular.copy($scope.appointments, dataX)

				for (var index in dataX) {

					var newData = {};
					for (var key in columns) {
						if (columns[key].indexOf('.') !== -1) {

							var parent = columns[key].toString().split('.')[0];
							var subName = columns[key].toString().split('.')[1];
							newData[columns[key]] = dataX[index][parent] && dataX[index][parent][subName] ? dataX[index][parent][subName] : ''
						} else {
							newData[columns[key]] = dataX[index][columns[key]];
						}
					}
					dataToExport.push(_.values(newData))
				}

				var d = new Date();
				var datestring = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
				var exportURL = '/api/export/appointments_' + datestring;
				angular.element('#frmSubmit').attr('action', exportURL);
				angular.element('#data').val(JSON.stringify(dataToExport));
				angular.element('#frmSubmit').submit();
			}
			
		}
	}

	angular.module('eventx')
		.controller('MainController', MainController);
})();