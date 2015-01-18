var app = angular.module('myApp',['ngRoute']);

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
