angular.module('gordon').factory('authSvc', function($http) {
    'use strict';

    function createDbSession(authData, password, cb) {
        var db = new PouchDB(authData.dbname);

        var remoteDb = 'https://' + authData.username + ':' + password + '@gordon.cloudant.com/' + authData.dbname;

        db.sync(remoteDb, {
            live: true
        });

        cb(null, db);
    }

    function authenticate(authForm, cb) {
        $http.post('/api/sessions', authForm)
            .success(function(authData) {
                createDbSession(authData, authForm.password, cb);
            });
    }

    return {
        authenticate: authenticate
    };
});
