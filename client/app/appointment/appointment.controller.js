'use strict';

angular.module('eventx')
  .controller('AppointmentCtrl', function ($scope,$timeout, socket, CalendarEvent, Auth) {
    var newEventDefaults = {
      title: "Untitled Event",
      description: "",
      className: "",
      icon: "",
      allDay: false,
      User: {}
    };    
    $scope.message = 'Hello';
    $scope.getCurrentUser = Auth.getCurrentUser;
    
    $scope.getCurrentUser(function(user) {
      $scope.currentUser = user;
      $scope.userInfo.user = $scope.currentUser.name;
      $scope.userInfo.createdDate = new Date();
      newEventDefaults.creator = $scope.currentUser._id;
    });

  });
