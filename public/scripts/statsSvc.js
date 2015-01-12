angular.module('gordon').factory('statsSvc', function(listSvc) {
	'use strict';

	function extractPoint(row) {
		return Number(row.key.points);
	}

    function generateChartData(cb) {
        listSvc.getDoneList(function(err, allDocs) {
            var pointsArray = allDocs.rows.map(extractPoint);

            var chartData = {
                series: 'points',
                data: [{
                    y: pointsArray
                }]
            };

            cb(null, chartData);
        });
    }

    return {
    	generateChartData: generateChartData
    };
});
