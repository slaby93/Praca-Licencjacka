var express = require('express');
var router = express.Router();
var mongo = require('./dbConnect.js');
var check = require('check-types');

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
    //mongo.connect(function (db) {
    //    "use strict";
    //    db.test.find({}, function (err, data) {
    //        if (err) {
    //            console.error(err);
    //            res.json("error");
    //        }
    //        res.json(data);
    //        db.close();
    //    });
    //});

});
module.exports = router;



