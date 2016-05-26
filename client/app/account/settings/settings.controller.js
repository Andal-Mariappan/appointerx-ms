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
        .then(() => {
          this.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect password';
          this.message = '';
        });
    }
  }
}

angular.module('eventx')
  .controller('SettingsController', SettingsController);
