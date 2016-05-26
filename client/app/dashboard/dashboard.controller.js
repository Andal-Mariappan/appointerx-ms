'use strict';

(function() {

	class DashboardController {

		constructor($http, $scope,$rootScope,$state, $compile, socket, Auth, AppointmentService, User,Shifts) {
			var vm= this;
			this.$http = $http;
			this.awesomeThings = [];
			this.appointments = [];
			this.slots=[];
			this.isLoggedIn = Auth.isLoggedIn;
			this.isAdmin = Auth.isAdmin;
			this.getCurrentUser = Auth.getCurrentUser;
			$rootScope.$state = $state;
		}
	}

	angular.module('eventx')
		.controller('DashboardController', DashboardController);
})();