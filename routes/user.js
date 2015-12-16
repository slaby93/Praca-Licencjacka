var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var assert = require('assert');
var mongo = require('./dbConnect.js');
// POST http://localhost:3000/user/login
/**
 * @description Logowanie
 */
router.post('/', function(req, res, next) {
    var hash = req.body.hash;
    console.log(hash);
    res.send("LOGOWANIE");
});
/**
 * @description Rejestracja
 */
router.post('/register', function(req, res, next) {
    if(!req.body.login || !req.body.password || !req.body.retypedPassword) {
        return res.status(400).json({message: 'Proszę wypełnić wszystkie pola!'});
    }
    if(req.body.password !== req.body.retypedPassword) {
        return res.status(400).json({message: 'Proszę wpisać pasujące hasła!'});
    }
    mongo.connect("projekt", ["user"], function(db) {
       db.user.find({"login": req.body.login}, function(err, docs) {
           if(docs.length > 0) {
               return res.status(400).json({message: 'Użytkownik już istnieje, wybierz inny login!'});
           }
           db.user.insert({"login": req.body.login, "password": bcrypt.hashSync(req.body.password, 10)});
           res.status(200).json(req.body);
       });
    });
});

module.exports = router;