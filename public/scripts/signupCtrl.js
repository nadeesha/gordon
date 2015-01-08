angular.module('gordon').controller('signupCtrl',function ($scope, $http) {
	'use strict';

	$scope.signup = function () {
		$http.post('/api/users', $scope.signupForm)
			.success(function () {
				console.log('signup success');
			});
	};
});