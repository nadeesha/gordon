angular.module('gordon').controller('todoCtrl', function($scope, listSvc, statsSvc) {
    'use strict';

    var add = function(newItem) {
        listSvc.insertNew(newItem, function(err, response) {
            if (err) {
                console.error(err);
            } else {
                console.info('added new doc');
                console.info(response);
            }
        });
    };



    var refreshData = function() {
        listSvc.getUndoneList(function(err, result) {
            $scope.list = [];

            console.info('retrieved all docs');
            console.info(result.rows);

            $scope.$apply(function() {
                $scope.undonelist = result.rows;
            });
        });

        listSvc.getDoneList(function(err, result) {
            $scope.list = [];

            console.info('retrieved all docs');
            console.info(result.rows);

            $scope.$apply(function() {
                $scope.donelist = result.rows;
            });
        });

        statsSvc.generateChartData(function(err, result) {
            $scope.$apply(function() {
                $scope.chart.data = {
                    data: result
                };
            });
        });
    };

    var parseTask = function(text) {
        return text.split('+')[0].trim();
    };

    var parsePoints = function(text) {
        return text.split('+')[1].trim();
    };

    $scope.remove = function(item) {
        listSvc.deleteDoc(item, function(err, response) {
            console.info('deleted doc');
            console.log(response);
        });
    };

    $scope.markAsDone = function(item) {
        listSvc.markAsDone(item, function(err, response) {
            console.info('doc marked as done');
            console.log(response);
        });
    };

    $scope.action = function($event) {
        if ($event.keyCode === 13) {

            add({
                task: parseTask($scope.currentItem),
                points: parsePoints($scope.currentItem)
            });

            $scope.currentItem = null;
        }
    };

    $scope.chart = {
        type: 'bar',
        config: {
            labels: false,
            colors: ['orange'],
        }
    };

    listSvc.subscribe(refreshData);
});
