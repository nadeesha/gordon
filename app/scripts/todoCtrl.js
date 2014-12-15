angular.module('gordon').controller('todoCtrl', function($scope, listSvc) {
    'use strict';

    var add = function(newItem) {
        listSvc.insertNew(newItem);
        $scope.list = listSvc.getList();
    };

    var parseTask = function (text) {
    	return text.split('+')[0].trim();
    };

    var parsePoints = function (text) {
    	return text.split('+')[1].trim();
    }

    $scope.remove = function(index) {
        listSvc.remove(index);
        $scope.list = listSvc.getList();
    };

    $scope.list = listSvc.getList();

    $scope.action = function($event) {
        if ($event.keyCode === 13) {

            add({
                task: parseTask($scope.currentItem),
                points: parsePoints($scope.currentItem),
                addedOn: Date.now
            });

            $scope.currentItem = null;
        }
    };
});
