angular.module('gordon').factory('listSvc', function () {
	'use strict';

	var list = [];

	var insertNew = function (newItem) {
		list.push(newItem);
	};

	var remove = function (i) {
		list.splice(i, 1);
	};

	var get = function () {
		return list;
	};

	return {
		insertNew: insertNew,
		remove: remove,
		getList: get
	};
});