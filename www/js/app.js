// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
app = angular.module('app', ['ionic','ngCordova'])
var db = null;

app.run(function($ionicPlatform,$cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    window.plugins.sqlDB.copy("villan.db",function() {
        db = $cordovaSQLite.openDB("villan.db");
    },function(error) {
        db = $cordovaSQLite.openDB("villan.db");
    });

  });
})

app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    
    .state('page3', {
      url: '/',
      templateUrl: 'page3.html'
    })
    
    .state('page6', {
      url: '/page6',
      cache:false,
      templateUrl: 'page6.html',
      controller:'villaninertCtrl'
    })
    
    .state('page7', {
      url: '/page7',
      cache:false,
      templateUrl: 'page7.html',
      controller:'villanListCtrl'
    })
    
    .state('page8', {
      url: '/{name}/{from}/{des}',
      templateUrl: 'page8.html',
      controller:'villanDetailCtrl'
    })
    
    .state('page9',{
      url:'/{id}/{name}/{from}/{des}',
      templateUrl:'page9.html',
      controller:'villanEditCtrl'
    })
  
  $urlRouterProvider.otherwise('/');
  
});
