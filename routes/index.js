var express = require('express');
var router = express.Router();
var mongo = require('./dbConnect.js');
var check = require('check-types');
var assert = require('assert');
var formidable = require('formidable');
var http = require('http');
var util = require('util');
var fs = require('fs');
var tokenHandler = require("./tokenHandler");

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

    /*
        Kolejność wykonywania:
        on field
        on fileBegin
        parse
        on end
     */

    /*
        Zawsze musi być, nawet gdy puste.
     */
    form.parse(req, function (err, fields, files) {
    });

    /*
        req.body przy wgrywaniu zdjęć jest puste {}
        Potrzebne dane należy wyłapać za pomocą tej funkcji,
        obecnie zapisuję jedynie token i sztucznie dodaję do req.body
     */
    form.on('field', function(name, value) {
        if(name === 'token') {
            req.body.token = value;
            req.body.decodedToken = tokenHandler.decodeToken(req.body.token);
        }
    });

    form.on('fileBegin', function(name, file) {
        file.path = galleryPath + '/' + req.body.decodedToken._id + '/avatar.png';
    });

    form.on('file', function(name, file) {
    });

    form.on('end', function() {
        res.send({answer: 'File transfer completed'});
    });

});

module.exports = router;



