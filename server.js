'use strict';

var express = require('express');
var users = require('./api/users');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

app.post('/api/users', users.createUser);

app.post('/api/sessions', users.createSession);

app.use(express.static(__dirname + '/public'));

console.log('app starting up on ' + process.env.PORT);
app.listen(process.env.PORT);