'use strict';

(function() {

class AdminController {
  constructor(User) {
    // Use the User $resource to fetch all users
    this.user = User.get();
    console.log(this.user);
  }

  delete(user) {
    user.$remove();
    //this.users.splice(this.users.indexOf(user), 1);
  }
}

angular.module('eventx.admin')
  .controller('AdminController', AdminController);

})();
