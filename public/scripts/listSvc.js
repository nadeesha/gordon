angular.module('gordon').factory('listSvc', function() {
    'use strict';

    var _list = [];

    function insertNew(newItem) {
        _list.push(newItem);
    }

    function remove(i) {
        _list.splice(i, 1);
    }

    function get() {
        return _list;
    }

    return {
        insertNew: insertNew,
        remove: remove,
        getList: get
    };
});
