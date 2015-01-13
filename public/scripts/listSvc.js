angular.module('gordon').factory('listSvc', function($rootScope) {
    'use strict';

    function insertNew(newItem, cb) {
        newItem.type = 'todo';
        $rootScope.db.post(newItem, cb);
    }

    function markAsDone (newItem, cb) {
        newItem.done = true;
        $rootScope.db.put(newItem, cb);
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

    function getUndoneDocs (cb) {
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

    function filter(doc) {
        return !doc._deleted;
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
        subscribe: subscribe,
        deleteDoc: deleteDoc,
        markAsDone: markAsDone
    };
});
