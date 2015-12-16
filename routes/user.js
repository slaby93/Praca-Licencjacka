var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var assert = require('assert');
var mongo = require('./dbConnect.js');
var jwt = require('jsonwebtoken');

// POST http://localhost:3000/user/login
/**
 * @description Logowanie
 */
router.post('/', function (req, res, next) {
    if (!req.body.login || !req.body.password) {
        return res.status(400).json({message: 'Proszę wypełnić wszystkie pola!'}).end(function () {
            db.close();
        });
    }
    mongo.connect("projekt", ["user"], function (db) {
        db.user.find({"login": req.body.login}, function (err, docs) {
            if (docs.length == 0) {
                return res.status(400).json({message: 'Użytkownik nie istnieje, wpisz poprawny login!'}).end(function () {
                    db.close();
                });
            }
            if (bcrypt.compareSync(req.body.password, docs[0].password)) {
                generateJWT(req.body.login, function (token) {
                    delete docs[0]["_id"];
                    delete docs[0]["password"];
                    res.status(200).json({"user": docs[0], "token": token}).end(function () {
                        db.close();
                    });
                });
            }
            else {
                res.status(400).json({message: 'Podane hasło jest nieprawidłowe!'}).end(function () {
                    db.close();
                });
            }
        });
    });
});
/**
 * @description Rejestracja
 */
router.post('/register', function (req, res, next) {
    if (!req.body.login || !req.body.password || !req.body.retypedPassword) {
        return res.status(400).json({message: 'Proszę wypełnić wszystkie pola!'}).end(function () {
            db.close();
        });
    }
    if (req.body.password !== req.body.retypedPassword) {
        return res.status(400).json({message: 'Proszę wpisać pasujące hasła!'}).end(function () {
            db.close();
        });
    }
    mongo.connect("projekt", ["user"], function (db) {
        db.user.find({"login": req.body.login}, function (err, docs) {
            if (docs.length > 0) {
                return res.status(400).json({message: 'Użytkownik już istnieje, wybierz inny login!'}).end(function () {
                    db.close();
                });
            }
            db.user.insert({"login": req.body.login, "password": bcrypt.hashSync(req.body.password, 10)});
            res.status(200).json(req.body).end(function () {
                db.close();
            });
        });
    });
});

function generateJWT(passedUser, callback) {
    var today = new Date();
    var expire = new Date(today);
    expire.setDate(today.getDate() + 1);
    jwt.sign({"login": passedUser}, "SECRET", {"algorithm": "HS256"}, function (token) {
        if (callback) {
            callback(token);
        }
    });
};

module.exports = router;