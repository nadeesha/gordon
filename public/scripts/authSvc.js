angular.module('gordon').factory('authSvc', function($http, $rootScope, localStorageService) {
    'use strict';


    function authenticate(authForm, cb) {
        $http.post('/api/sessions', authForm)
            .success(function(authData) {
                cb(err, authData);
            });
    }

    return {
        authenticate: authenticate
    };
});
