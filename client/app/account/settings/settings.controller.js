'use strict';

class SettingsController {
  constructor(Auth,User, $cookies,$location) {
    this.errors = {};
    this.submitted = false;
    this.Auth = Auth;
    if ($cookies.get('token') && $location.path() !== '/logout') {
			this.currentUser = User.get();
		}
  }

  changePassword(form) {
    this.submitted = true;
    if (form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then((res) => {
          Materialize.toast(res.data || "Password successfully changed.", 2000, '', function () { });          
          
          
          this.submitted = false;
          this.user = {};
        })
        .catch((res) => {
          Materialize.toast(res.data || "Incorrect Password.", 2000, '', function () { });
        });
    }
  }
}

angular.module('eventx')
  .controller('SettingsController', SettingsController);
