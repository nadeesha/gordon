angular.module('gordon').controller('loginCtrl', function($scope, $http, localStorageService, authSvc) {
    'use strict';

    $scope.login = function() {
		authSvc.authenticate($scope.loginForm, function (err, db) {
			db.post({foo: 'bar'}, function (err, response) {
				debugger;
			});
 		});
    };
});
