var express = require('express');
var router = express.Router();
var mongo = require('./dbConnect.js');
var check = require('check-types');
var assert = require('assert');
var formidable = require('formidable');
var http = require('http');
var util = require('util');
var fs = require('fs');


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

/**
 * @description pobiera plik od użytkownika i wgrywa do /public/gallery
 */
router.post('/upload', function (req, res, next) {
    var form = new formidable.IncomingForm();
    var galleryPath = './public/gallery';

    form.keepExtensions = true;
    form.uploadDir = galleryPath;

    if (fs.existsSync(galleryPath) === false) {
        fs.mkdirSync(galleryPath);
    }

    form.parse(req, function (err, fields, files) {
        res.send({answer: 'File transfer completed'});
        //res.writeHead(200, {'content-type': 'text/image'});
        //res.write({answer : 'File transfer completed'});
        //res.write(util.inspect({fields: fields, files: files}));
    });

});

module.exports = router;



