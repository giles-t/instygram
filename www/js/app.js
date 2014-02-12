'use strict';

angular.module('ui', []).value('$anchorScroll', angular.noop);
// Declare app level module which depends on filters, and services
var app = angular.module('app', ['ui.router', 'ngResource', 'firebase']);

app.config(function($locationProvider, $stateProvider, $urlRouterProvider) {

  // HTML5 History State Mode
  // $locationProvider.html5Mode(true);

  $urlRouterProvider

    // Redirects
    .when('/f/:user', '/user/:user')
    .when('/f/:user/m/:media', '/follow/:user/media/:media')

    // 404
    .otherwise('/add');

  $stateProvider
    .state('user', {
      url: '/follow/:user',
      templateUrl: 'partials/media-list.html',
      controller: 'mediaListController'
    })
    .state('user.media', {
      url: '/media/:media',
      templateUrl: 'partials/modal.html',
      controller: 'mediaController'
    }).state('add', {
      url: '/add',
      templateUrl: 'partials/add.html',
      controller: 'addController'
    }).state('admin', {
      url: '/admin',
      templateUrl: 'partials/admin.html',
      controller: 'adminController'
    });

});

// API Values
app.value('instagramApiURL', 'https://api.instagram.com/v1/');
app.value('instagramClienId', '39e8f05d556240808c7e98e5926d1f7d');
app.value('firebaseURL', 'https://followla.firebaseio.com/');
