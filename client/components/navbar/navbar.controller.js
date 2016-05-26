'use strict';

class NavbarController {
  //end-non-standard

  constructor(Auth,$state,$rootScope) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    $rootScope.$state = $state;
  }
}

angular.module('eventx')
  .controller('NavbarController', NavbarController);
