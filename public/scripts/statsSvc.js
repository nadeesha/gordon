angular.module('gordon').factory('statsSvc', function(dataSvc) {
    'use strict';

    function generateLast25Days() {
        var dates = {};
        var today = moment().dayOfYear();
        var lastDay = moment().dayOfYear() - 25;

        while (today >= lastDay) {
            dates[moment().dayOfYear(lastDay).format('MMM DD')] = [0];
            lastDay++;
        }

        return dates;
    }

    function generateChartData(cb) {
        dataSvc.getPointsByDate(function(err, data) {
            var dateSeries = generateLast25Days();
            var chartData = [];

            data.rows.forEach(function(dataPoint) {
                dateSeries[dataPoint.key] = dataPoint.value;
            });

            for (var date in dateSeries) {
                if (dateSeries.hasOwnProperty(date)) {
                    chartData.push({
                        x: date,
                        y: [dateSeries[date]]
                    });
                }
            }

            cb(err, chartData);
        });
    }

    return {
        generateChartData: generateChartData
    };
});
