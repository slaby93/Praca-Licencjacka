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
    //niewypelnione pola
    if (!req.body.login || !req.body.password) {
        return res.status(400).json({message: 'Proszę wypełnić wszystkie pola!'}).end(function () {
            db.close();
        });
    }
    //polaczenie do bazy
    mongo.connect("projekt", ["user"], function (db) {
        //zapytanie o uzytkownika
        db.user.find({"login": req.body.login}, function (err, docs) {
            //niepoprawny login
            if (docs.length == 0) {
                return res.status(400).json({message: 'Użytkownik nie istnieje, wpisz poprawny login!'}).end(function () {
                    db.close();
                });
            }
            //poprawne haslo po weryfikacji biblioteki bcrypt
            if (bcrypt.compareSync(req.body.password, docs[0].password)) {
                generateJWT(req.body.login, function (token) {
                    //usuwanie newralgicznych dla bezpieczenstwa informacji
                    docs[0] = removeSensitiveUserData(docs[0]);
                    //zwrot informacji o uzytkowniku oraz wygenerowanego tokena
                    res.status(200).json({"user": docs[0], "token": token}).end(function () {
                        db.close();
                    });
                });
            }
            //niepoprawne hasolo
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
    //niewypelnione pola
    if (!req.body.login || !req.body.password || !req.body.retypedPassword) {
        return res.status(400).json({message: 'Proszę wypełnić wszystkie pola!'}).end(function () {
            db.close();
        });
    }
    //niepasujace hasla
    if (req.body.password !== req.body.retypedPassword) {
        return res.status(400).json({message: 'Proszę wpisać pasujące hasła!'}).end(function () {
            db.close();
        });
    }
    //laczenie z baza
    mongo.connect("projekt", ["user"], function (db) {
        //zapytanie do bazy o uzytkownika
        db.user.find({"login": req.body.login}, function (err, docs) {
            //jezeli znaleziono uzytkownika
            if (docs.length > 0) {
                return res.status(400).json({message: 'Użytkownik już istnieje, wybierz inny login!'}).end(function () {
                    db.close();
                });
            }
            //dodanie uzytkownika do bazy
            db.user.insert({"login": req.body.login, "password": bcrypt.hashSync(req.body.password, 10)});
            res.status(200).json(req.body).end(function () {
                db.close();
            });
        });
    });
});

router.post('/token', function (req, res, next) {
    var token = req.body.token;
    var decodedToken = decodeToken(token);
    if (decodedToken === null) {
        res.status(406).send("Token is invalid");

        return;
    }

    mongo.connect("projekt", ["user"], function (db) {
        db.user.find({"login": decodedToken.login}, function (err, data) {
            if (err) {
                res.status(500).send("Token is valid, but error when fetching from db");
                return;
            }
            // nie znaleziono uzytkowika z bazie
            if (!data.length > 0) {
                res.status(500).send("User not found");
                return;
            }
            var User = removeSensitiveUserData(data[0]);
            res.status(200).send(User);
            return;
        });
    });
});

/**
 * @description Generowanie tokenow za pomoca biblioteki JWT
 * @param passedUser
 * @param callback
 */
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
/**
 * @description Dekoduje otrzymany token
 * @param token
 */
function decodeToken(token) {
    try {
        var decoded = jwt.verify(token, "SECRET");
        delete decoded["iat"];
        return decoded;
    } catch (err) {
        return null;
    }

};

function closeDB(db) {
    db.close();
}

function removeSensitiveUserData(User) {
    delete User["_id"];
    delete User["password"];
    return User;
}
module.exports = router;