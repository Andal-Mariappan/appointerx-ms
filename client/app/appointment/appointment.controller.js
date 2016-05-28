'use strict';

(function () {

  class AppointmentCtrl {

    constructor($timeout,$rootScope,$state, socket, AppointmentService, Auth) {
      var vm = this;
      vm.appointments = [];
      vm.isAdmin = Auth.isAdmin;
      $rootScope.$state = $state;
      vm.getCurrentUser = Auth.getCurrentUser;
      vm.defaultMode='card'
      vm.getCurrentUser(function (user) {
        vm.currentUser = user;
        
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
  }

  angular.module('eventx')
    .controller('AppointmentCtrl', AppointmentCtrl);
})();