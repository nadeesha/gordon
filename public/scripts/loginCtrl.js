angular.module('gordon').controller('loginCtrl', function($scope, $http, localStorageService,
    authSvc, $state) {
    'use strict';

    $scope.login = function() {
        authSvc.authenticate($scope.loginForm, function() {
            $state.go('app');
        });
    };
});