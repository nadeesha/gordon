angular.module('gordon').factory('statsSvc', function(dataSvc) {
    'use strict';

    function generateLast25Days() {
        var dates = {};
        var today = moment().dayOfYear();
        var lastDay = moment().dayOfYear() - 25;

        while (today >= lastDay) {
            var date = moment().dayOfYear(lastDay).format('MMM DD');
            dates[date] = lastDay;
            lastDay++;
        }

        return dates;
    }

    function generateChartData(cb) {
        dataSvc.getPointsByDate(function(err, data) {
            var chartData = [];

            var dateSeries = generateLast25Days();

            // keep the order of the dates and reset the series
            var datesOrder = _.clone(dateSeries);
            _.forIn(dateSeries, function (v, k) {
                dateSeries[k] = [0];
            });

            data.rows.forEach(function(dataPoint) {
                if (dateSeries[dataPoint.key]) {
                    // TODO: drop irrelevant old datapoints from the
                    // map reduce query.
                    dateSeries[dataPoint.key] = dataPoint.value;
                }
            });

            for (var date in dateSeries) {
                if (dateSeries.hasOwnProperty(date)) {
                    chartData.push({
                        x: date,
                        y: [dateSeries[date]],
                        order: datesOrder[date]
                    });
                }
            }

            chartData = _.sortBy(chartData, function (point) {
                return point.order;
            });

            cb(err, chartData);
        });
    }

    return {
        generateChartData: generateChartData
    };
});
