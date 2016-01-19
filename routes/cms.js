/**
 * Created by Slaby on 02.12.2015.
 */
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var mongo = require('./dbConnect.js');
var check = require('check-types');
var assert = require('assert');


module.exports = router;