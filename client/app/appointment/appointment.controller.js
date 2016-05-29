'use strict';

(function () {

  class AppointmentCtrl {

    constructor($timeout,$rootScope,$state, socket, AppointmentService, Auth) {
      var vm = this;
      vm.appointments = [];
      vm.isAdmin = Auth.isAdmin;
      this.AppointmentService=AppointmentService;
      $rootScope.$state = $state;
      vm.getCurrentUser = Auth.getCurrentUser;
      vm.defaultMode='card'
      
      vm.getCurrentUser(function (user) {
        vm.currentUser = user;
      vm.appointmentStatus= ['Awaiting', 'Cancel', 'Done'];  
        // get app the appointments of logged users - physician/patient        
        if (vm.currentUser.role === 'patient') {
          AppointmentService.byPatientID.query({
            patientId: vm.currentUser._id
          }).$promise.then(function (response) {
            console.log(response)
            vm.appointments = response;
            socket.syncUpdates('appointment', vm.appointments);
          });
        }
        else if (vm.currentUser.role === 'physician') {
          AppointmentService.byDocId.query({
            docId: vm.currentUser._id
          }).$promise.then(function (response) {
            console.log(response)
            vm.appointments = response;
            socket.syncUpdates('appointment', vm.appointments);
          });
        }

      });
    }
    
    setAppointmentStatus(app)
    {
      console.log(app);
      if(app)
      {
        delete app.patient;
        delete app.physician;
        
        this.AppointmentService.update({
				id: app._id
			}, app).$promise.then(function () {
				Materialize.toast('Appointment updated.', 2000, '', function () { });
			}, function (error) { // error handler
				if (error.data.errors) {
					var err = error.data.errors;
					console.log(err[Object.keys(err)].message, err[Object.keys(err)].name);
				} else {
					var msg = error.data.message;
					console.log(msg);
          Materialize.toast(msg, 2000, '', function () { });
				}
			});
        
        
      }
       console.log(app);
    }
  }

  angular.module('eventx')
    .controller('AppointmentCtrl', AppointmentCtrl)
  .filter('UTCToNow', function () {
  return function (input, format) {
    return moment.utc(input).format('dddd, MMMM Do YYYY, h:mmA');
  };
});
})();