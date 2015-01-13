'use strict';

var auth = require('./lib/auth');
var db = require('./lib/db');
var uuid = require('node-uuid');

exports.createUser = function(req, res, next) {
    var dbname = 'd' + uuid.v1();
    var account = null;

    function handleResponse(err, assignment) {
        if (err) {
            console.error('error assigning user to db');
            return next(err);
        } else {
            console.log('successfully assigned user to db: ');
            console.log(assignment);

            return res.send(201);
        }
    }

    function addUserToDb(err, dbUser) {
        if (err) {
            console.error('error creating db user');
            return next(err);
        } else {
            console.log('successfully created db user: ');
            console.log(dbUser);

            return db.addUserToDb(account.username, dbname, ['_reader', '_writer'],
                null, handleResponse);
        }
    }

    function createUser(err, newDb) {
        if (err) {
            console.error('error creating db');
            return next(err);
        } else {
            console.log('created db successfully');
            console.log(newDb);

            return db.createUser(account.username, req.body.password, null,
                addUserToDb);
        }
    }

    function createDb(err, newAccount) {
        if (err) {
            console.error('error creating user in stormpath');
            return next(err);
        } else {
            console.log('created account: ');
            console.log(newAccount);

            account = newAccount;

            return db.createDb(dbname, null, createUser);
        }
    }

    auth.createUser(
        req.body.firstName,
        req.body.lastName,
        req.body.email,
        req.body.password, {
            dbname: dbname
        },
        createDb
    );
};

exports.createSession = function(req, res, next) {
    var response = {};

    function sendAuthResponse(err, customData) {
        if (err) {
            return next(err);
        } else {
            response.dbname = customData.dbname;

            return res.send(200, response);
        }
    }

    function handleAuth(err, authResult) {
        if (err) {
            console.error('error authenticating user: ');
            console.error(err);

            return next(err);
        } else {
            console.log('successfully authenticated: ');
            console.log(authResult);

            response.username = authResult.account.username;

            return auth.getDb(authResult.account.username, null, sendAuthResponse);
        }
    }

    auth.authenticate(req.body.email, req.body.password, null, handleAuth);
};
