angular.module('gordon').controller('todoCtrl', function ($scope, listSvc) {
	'use strict';

	var add = function (newItem) {
		listSvc.insertNew(newItem);
		$scope.list = listSvc.getList();
	};

	$scope.remove = function (index) {
		listSvc.remove(index);
		$scope.list = listSvc.getList();
	};

	$scope.list = listSvc.getList();

	$scope.action = function ($event) {
		if ($event.keyCode === 13) {
			add($scope.currentItem);
			$scope.currentItem = null; 
		}
	};
});