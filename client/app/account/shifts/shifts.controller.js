'use strict';

class ShiftsController {
  constructor(Auth, Shifts, $cookies, $location, $state, $scope, socket) {
    var vm = this;
    this.errors = {};
    this.submitted = false;
    this.Auth = Auth;
    this.Shifts = Shifts;
    vm.slots = [];
    this.getCurrentUser = this.Auth.getCurrentUser;
    if ($cookies.get('token') && $location.path() !== '/logout') {
      if (this.getCurrentUser().role != 'physician' && this.getCurrentUser().role != 'admin') {
        $state.go('login');
      }
    }
    $(".sidebar-collapse").sideNav('hide');
    Shifts.byDocId({
					docId: this.getCurrentUser()._id
				}).$promise.then(function(shifts) {
					vm.slots = shifts;
					socket.syncUpdates('settings', vm.slots);
				});

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates("Settings");
    });
  }

  deleteSlot(slot) {
    if (!slot._id) return;
    this.editSlot({});
    this.Shifts.delete({ id: slot._id })
      .$promise.then(function(response) {
        Materialize.toast('Shift deleted.', 2000, '', function() { });
      }, function(error) { 
        Materialize.toast('Sorry, Something went wrong.', 2000, '', function () { });
        if (error.data.errors) {
          var err = error.data.errors;
          console.log(err[Object.keys(err)].message, err[Object.keys(err)].name);
        } else {
          var msg = error.data.message;
          console.log(msg);
        }
      });
  }

  editSlot(slot) {
    this.slot = slot;
    // this.slot.start = moment(this.slot.start.toString(), "h:mm").format("hh:mmA");
    // this.slot.end = moment(this.slot.end.toString(), "h:mm").format("hh:mmA");
  }

  setBusinessHours(form) {
    this.submitted = true;
    this.slot.UserId = this.getCurrentUser()._id;
    this.slot.dow = JSON.stringify(this.slot.dow);
    
    this.slot.start = moment(this.slot.start.toString(), "h:mm a").format("HH:mm");
    this.slot.end = moment(this.slot.end.toString(), "h:mm a").format("HH:mm");
    
    
    if (form.$valid) {

      if (this.slot._id) {
        this.Shifts.update({ id: this.slot._id }, this.slot).$promise
          .then(() => {
            Materialize.toast('Settings saved successfully.', 2000, '', function () { });            
            this.slot = {};
          })
          .catch(() => {
            form.slot.start.$setValidity('mongoose', false);
            Materialize.toast('Sorry, Something went wrong.', 2000, '', function () { });
          });
      }
      else
      {
        this.Shifts.save(this.slot)
        .$promise.then(() => {
            Materialize.toast('Settings saved successfully.', 2000, '', function () { });
            this.slot = {};
          })
          .catch(() => {
            form.slot.start.$setValidity('mongoose', false);
            Materialize.toast('Sorry, Something went wrong.', 2000, '', function () { });
          });
      }
    }
  }
}

angular.module('eventx')
  .controller('ShiftsController', ShiftsController);
