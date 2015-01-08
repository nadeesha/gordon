'use strict';

angular.module('gordon', ['ui.router', 'LocalStorageModule']);

angular.module('gordon').config(function($stateProvider) {
    $stateProvider
        .state('app', {
            templateUrl: 'views/todo.html',
            controller: 'todoCtrl',
            url: '/app'
        })
        .state('login', {
            templateUrl: 'views/login.html',
            controller: 'loginCtrl',
            url: '/login'
        })
        .state('signup', {
            templateUrl: 'views/signup.html',
            controller: 'signupCtrl',
            url: '/signup'
        });
});

angular.module('gordon').config(function(localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('gordon');
});
