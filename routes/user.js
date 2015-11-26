var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

// POST http://localhost:3000/user/login
/**
 * @description Logowanie
 */
router.post('/', function(req, res, next) {
    var hash = req.body.hash;
    console.log(hash);
    res.send("LOGOWANIE");
});
router.post('/register', function(req, res, next) {
    res.send("REJESTRACJA");
});
// GET http://localhost:3000/user
router.get('/', function(req, res, next) {
    res.send("lista uzytkownikow");
});
var uzytkownicy = [];

module.exports = router;