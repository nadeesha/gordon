angular.module('gordon').controller('todoCtrl', function($scope, listSvc, $rootScope) {
    'use strict';

    var updateList = function() {
        $scope.list = listSvc.getList();
    };

    var add = function(newItem) {
        listSvc.insertNew(newItem);
    };

    var parseTask = function(text) {
        return text.split('+')[0].trim();
    };

    var parsePoints = function(text) {
        return text.split('+')[1].trim();
    };

    $scope.remove = function(index) {
        listSvc.remove(index);
        $scope.list = listSvc.getList();
    };

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

    $scope.delete = function(index) {
        listSvc.remove(index);
    };

    $scope.markDone = function(index) {
        listSvc.markDone(index);
    };

    $rootScope.$on('listChanged', updateList);
});
