'use strict';

(function () {

  class AppointmentCtrl {

    constructor($timeout, $rootScope, $state,$filter, socket, AppointmentService, Auth) {
      var vm = this;
      vm.appointments = [];
      vm.isAdmin = Auth.isAdmin;
      this.AppointmentService = AppointmentService;
      $rootScope.$state = $state;
      vm.getCurrentUser = Auth.getCurrentUser;
      vm.defaultMode = 'card'
      vm.curPage = 0;
      vm.pageSize = 12;


      vm.numberOfPages = function () {
        var myFilteredData = $filter('daterange')(vm.appointments, vm.startDate, vm.endDate)
        if (myFilteredData) {
          return Math.ceil(myFilteredData.length / vm.pageSize);
        } else {
          return Math.ceil(vm.appointments.length / vm.pageSize);
        }  
        //return Math.ceil(vm.appointments.length / vm.pageSize);
      };

      // vm.dateRangeFilter = function (fieldStart, fieldEnd, startDate, endDate) {
      //   return function (item) {
      //     if (startDate && endDate) {
      //       if (item[fieldStart] === null) return false;
      //       var appStart = moment(item[fieldStart]).format("DD-MM-YYYY");
      //       var appEnd = moment(item[fieldEnd]).format("DD-MM-YYYY");
      //       var s = moment(startDate, "D,MMM dddd").format("DD-MM-YYYY");
      //       var e = moment(endDate, "D,MMM dddd").format("DD-MM-YYYY");
      //       console.log(vm.appointments.length);
      //       console.log(appEnd <= e, appEnd, e, appStart);
      //       if (appStart >= s && appEnd <= e) return true;
      //       return false;
      //     }
      //     return true;
      //   }
      // }

      vm.getCurrentUser(function (user) {
        vm.currentUser = user;
        vm.appointmentStatus = ['Awaiting', 'Cancel', 'Done'];
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




    setAppointmentStatus(app) {

      if (app) {
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
    }).filter('pagination', function () {
      return function (input, start) {
        if (input) {
          start = +start;
          return input.slice(start);
        }
        return [];
      };
    }).filter('daterange', function() {
    return function(items, startDate, endDate) {
        var filteredResult = [];
        // Take action if the filter elements are filled
        if (startDate && endDate) {
                  
          items.forEach(function (item) {
            
             var appStart = moment(new Date(item.start)).format("DD-MM-YYYY"); 
            var appEnd = moment(new Date(item.end)).format("DD-MM-YYYY");
            var s = moment(new Date(startDate)).format("DD-MM-YYYY");
            var e = moment(new Date(endDate)).format("DD-MM-YYYY");

             
             console.log(appStart,e,appEnd,s);
             console.log(appStart >= s);
             console.log(appEnd <= e);

            // console.log(appEnd.isBefore(e) && appStart.isAfter(s) || (appStart.isSame(s) || appEnd.isSame(e)));
            //console.log(appStart.isBefore(s) ,appEnd.isAfter(e)); 


             if (appStart >= s && appEnd <= e ) {
                    filteredResult.push(item);
                }
            });

        } else {
            return items; // By default, show the regular table data
        }

        return filteredResult;
    }
});
    // .filter('daterange', function () {
    //   return function (appointments, start_date, end_date) {
    //     var result = [];

    //     // date filters
    //     var start_date = (start_date && !isNaN(Date.parse(start_date))) ? Date.parse(start_date) : 0;
    //     var end_date = (end_date && !isNaN(Date.parse(end_date))) ? Date.parse(end_date) : new Date().getTime();

    //     // if the conversations are loaded
    //     if (appointments && appointments.length > 0) {
    //       $.each(appointments, function (index, appointment) {
    //         var appointmentStart = new Date(appointment.start);
    //         var appointmentEnd = new Date(appointment.end);

    //         if (appointmentStart >= start_date && appointmentEnd <= end_date ) {
    //           result.push(appointment);
    //         }
    //       });
    //       return result;
    //     }
    //   };
    // });
})();