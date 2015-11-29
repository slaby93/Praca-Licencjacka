var express = require('express');
var router = express.Router();
var mongo = require('./dbConnect.js');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
// http://localhost:8080/testowo
router.all('/testowo', function (req, res, next) {
    mongo.connect(function (db) {
        "use strict";
        db.test.find({}, function (err, data) {
            if (err) {
                console.error(err);
                res.json("error");
            }
            res.json(data);
        });


    });

});
module.exports = router;



