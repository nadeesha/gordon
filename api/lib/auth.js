'use strict';

var stormpath = require('stormpath');
var uuid = require('node-uuid');

var client = null;
var authApp = null;

var apiKey = new stormpath.ApiKey(
    process.env.STORMPATH_API_KEY_ID,
    process.env.STORMPATH_API_KEY_SECRET
);

var client = new stormpath.Client({
    apiKey: apiKey
});

client.getApplications({
    name: 'gordon'
}, function(err, applications) {
    if (err) {
        throw err;
    }

    console.log('created client app');
    authApp = applications.items[0];
});

exports.createUser = function(firstname, lastname, email, password, options, cb) {
    var stormPathAccount = {
        givenName: firstname,
        surname: lastname,
        username: uuid.v4(),
        email: email,
        password: password,
        customData: options
    };

    console.log(stormPathAccount);

    authApp.createAccount(stormPathAccount, cb);
};

exports.authenticate = function(username, password, options, cb) {
    var credentials = {
        username: username,
        password: password
    };

    authApp.authenticateAccount(credentials, cb);
};

exports.getDb = function (username, options, cb) {
    authApp.getAccounts({username: username}, function (err, result) {
        if (err) {
            return cb(err);
        } else {
            return result.items[0].getCustomData(cb);
        }
    });
};
