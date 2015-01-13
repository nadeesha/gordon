angular.module('gordon').factory('listSvc', function($rootScope) {
    'use strict';

    function insertNew(newItem, cb) {
        newItem.type = 'todo';
        newItem.addedOn = new Date();
        $rootScope.db.post(newItem, cb);
    }

    function markAsDone(doneItem, cb) {
        doneItem.done = true;
        doneItem.completedOn = new Date();
        $rootScope.db.put(doneItem, cb);
    }

    function getAllDocs(cb) {
        function map(doc) {
            if (doc.type === 'todo' && !doc._deleted) {
                emit(doc);
            }
        }

        $rootScope.db.query({
            map: map
        }, {
            reduce: false
        }, cb);
    }

    function getUndoneDocs(cb) {
        function map(doc) {
            if (doc.type === 'todo' && !doc.done && !doc._deleted) {
                emit(doc);
            }
        }

        $rootScope.db.query({
            map: map
        }, {
            reduce: false
        }, cb);
    }

    function getDoneDocs(cb) {
        function map(doc) {
            if (doc.type === 'todo' && doc.done && !doc._deleted) {
                emit(doc);
            }
        }

        $rootScope.db.query({
            map: map
        }, {
            reduce: false
        }, cb);
    }

    function getPointsByDate(cb) {
        function map(doc) {
            if (doc.type === 'todo' && doc.done && !doc._deleted) {
                // doc.completedOnDate = moment(doc.completedOn).format('MMM DD');
                emit(moment(doc.completedOn).format('MMM DD'), Number(doc.points));
            }
        }

        $rootScope.db.query({
            map: map,
            reduce: '_sum'
        }, {
            group: true
        }, cb);
    }

    function subscribe(cb) {
        $rootScope.db.changes()
            .on('complete', function(completed) {
                cb();

                $rootScope.db.changes({
                    live: true,
                    since: completed.last_seq // jshint ignore:line
                }).on('change', cb);
            });
    }

    function deleteDoc(doc, cb) {
        $rootScope.db.remove(doc, cb);
    }

    return {
        insertNew: insertNew,
        getList: getAllDocs,
        getDoneList: getDoneDocs,
        getUndoneList: getUndoneDocs,
        getPointsByDate: getPointsByDate,
        subscribe: subscribe,
        deleteDoc: deleteDoc,
        markAsDone: markAsDone
    };
});
