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

});
/**
 * @description pobiera plik od użytkownika i wgrywa do /public/gallery
 */
router.post('/upload', function (req, res, next) {
    var form = new formidable.IncomingForm();

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
        var token = fields.token;
        var userID = tokenHandler.decodeToken(token)._id;
        var userPath = "./public/gallery/" + userID + "/";
        var userFile = files.file;
        if (fs.existsSync(userPath) === false) {
            fs.mkdir(userPath, function () {
                fs.createReadStream(userFile.path)
                    .pipe(fs.createWriteStream(userPath + "avatar"));
                res.status(200).send("ok");
            });
        }
        else {
            fs.createReadStream(userFile.path)
                .pipe(fs.createWriteStream(userPath + "avatar"));
            res.status(200).send("ok");
        }


    });

});

module.exports = router;



