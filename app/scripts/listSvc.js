angular.module('gordon').factory('listSvc', function ($rootScope) {
	'use strict';

	var list = [];

	var insertNew = function (newItem) {
		list.push(newItem);
		$rootScope.$emit('listChanged');
	};

	var remove = function (i) {
		list.splice(i, 1);
		$rootScope.$emit('listChanged');
	};

	var get = function () {
		return list;
	};

	var markDone = function (i) {
		list[i].done = true;
		$rootScope.$emit('listChanged');
	}

	return {
		insertNew: insertNew,
		remove: remove,
		getList: get,
		markDone: markDone
	};
});