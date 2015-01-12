angular.module('gordon').service('remoteSessionSvc', function() {
	'use strict';

    this.initiateSync = function(username, password, dbname) {
        var remoteDb = 'https://' + username + ':' + password + '@gordon.cloudant.com/' + dbname;
        PouchDB.sync('gordon', remoteDb);
    };
});
