var express = require('express');
var router = express.Router();
var mongo = require('./dbConnect.js');
var check = require('check-types');
var assert = require('assert');
var http = require('http');
var util = require('util');
var tokenHandler = require("./tokenHandler");
var jwt = require('express-jwt');
var secret = new Buffer('a2571790-c4a2-4f1c-b5d0-a54bcfc0b98f', 'base64');
var auth = jwt({secret: secret, userProperty: 'payload'});
var guard = require('express-jwt-permissions')({
  requestProperty: 'payload',
  permissionsProperty: 'groups'
})

/**
 * @description Zwraca index.html
 */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
// http://localhost:8080/testowo
/**
 * @description Testowy rout. Mozecie tutaj wrzucac sobie wszystko.
 */
router.all('/testowo', function (req, res, next) {

});

module.exports = router;



