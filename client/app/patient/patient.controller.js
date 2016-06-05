'use strict';
(function () {

  class PatientComponent {
    constructor($scope, $timeout, socket, User, Patient, Auth) {
      $scope.message = 'Hello';

      $scope.userInfo = {}
      $scope.getCurrentUser = Auth.getCurrentUser;

      $scope.getCurrentUser(function (user) {
        $scope.currentUser = user;
        $scope.userInfo.user = $scope.currentUser.name;
        $scope.userInfo.createdDate = new Date();
      });

      Patient.getPatients().$promise.then(function (response) {
        $scope.patients = response;
        socket.syncUpdates('user', $scope.patients);
      });

      $scope.$on('$destroy', function () {
        socket.unsyncUpdates("user");
      });


    $scope.viewDetails=function(patient)
    {
      
    }

    }
  }

  angular.module('eventx')
    .controller('PatientComponent', PatientComponent);
})();
