var app = angular.module('myApp',['ui.bootstrap', 'ngRoute', 'ngDraggable', 'ngCsv']);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider

  .when('/', {
    templateUrl: 'views/main.html',
    controller: 'MainCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });

  $locationProvider
  .html5Mode(true);
})
