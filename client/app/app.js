'use strict';

angular.module('eventx', [
  'eventx.auth',
  'eventx.admin',
  'eventx.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'validation.match',
  'ui.calendar',
  'ui.materialize',
  'perfect_scrollbar'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
