/**
 * Created by Slaby on 02.12.2015.
 */
var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var mongo = require('./dbConnect.js');
var check = require('check-types');
// POST http://localhost:3000/user/login
/**
 * @description pobiera plik konfiguracyjny z serwera
 */
router.get('/', function (req, res, next) {
    mongo.connect("projekt", ['zakladkiCMS'], function (db) {
        db.zakladkiCMS.find({}, function (err, data) {
            if (err) {
                throw new Error(err);
            }
            res.json(data);
            return;
        });
    });
});

module.exports = router;