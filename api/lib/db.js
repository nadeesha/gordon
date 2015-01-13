'use strict';

var request = require('request');

var serverpath = 'https://gordon:kVVBxQPE8eM3Hb@gordon.cloudant.com';

exports.createDb = function(dbname, options, cb) {
    var dbpath = serverpath + '/' + dbname;

    console.log('trying to create db at: ' + dbpath);

    var requestOptions = {
        url: dbpath,
        method: 'PUT'
    };

    request(requestOptions, function(err, response, body) {
        cb(err, body);
    });
};

exports.createUser = function(username, password, options, cb) {
    var dbpath = serverpath + '/_users';

    var requestOptions = {
        url: dbpath,
        method: 'POST',
        body: {
            _id: 'org.couchdb.user:' + username,
            type: 'user',
            name: username,
            roles: [],
            password: password,
            salt: username
        },
        json: true
    };

    request(requestOptions, function(err, response, body) {
        cb(err, body);
    });
};

exports.addUserToDb = function(username, dbname, permissions, options, cb) {
    var dbpath = serverpath + '/' + dbname + '/_security';

    var requestBody = {
        'cloudant': {}
    };

    requestBody.cloudant[username] = permissions;

    var requestOptions = {
        url: dbpath,
        method: 'PUT',
        body: requestBody,
        json: true
    };

    request(requestOptions, function(err, response, body) {
        cb(err, body);
    });
};