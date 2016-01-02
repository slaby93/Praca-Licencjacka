var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var assert = require('assert');
var mongo = require('./dbConnect.js');
var tokenHandler = require("./tokenHandler");
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
                tokenHandler.generateJWT(req.body.login, function (token) {
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
        console.error("REGISTER ERROR : Nie wszystkie pola zostały wypełnione");
        return res.status(400).json({message: 'Proszę wypełnić wszystkie pola!'}).end(function () {
            db.close();
        });
    }
    //niepasujace hasla
    if (req.body.password !== req.body.retypedPassword) {
        console.error("REGISTER ERROR : Hasła się nie zgadzają");
        return res.status(400).json({message: 'Proszę wpisać pasujące hasła!'}).end(function () {
            db.close();
        });
    }
    var user = req.body;
    var password = bcrypt.hashSync(req.body.password, 10);
    user = removeSensitiveUserData(user);
    user.password = password;
    //laczenie z baza
    mongo.connect("projekt", ["user"], function (db) {
        //zapytanie do bazy o uzytkownika
        db.user.find({"login": user.login}, function (err, docs) {
            //jezeli znaleziono uzytkownika
            if (docs.length > 0) {
                console.error("REGISTER ERROR : Użytkownik już istnieje");
                return res.status(400).json({message: 'Użytkownik już istnieje, wybierz inny login!'}).end(function () {
                    db.close();
                });
            }
            console.log("Dodawanie Uzytkownika");
            //dodanie uzytkownika do bazy
            db.user.insert(user);
            res.status(200).json(user).end(function () {
                db.close();
            });
        });
    });
});

router.post('/token', function (req, res, next) {
    var token = req.body.token;
    var decodedToken = tokenHandler.decodeToken(token);
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

router.post('/all', function (req, res, next) {
    mongo.connect("projekt", ["user"], function (db) {
        db.user.find({}, {
                "_id": 0
                , "password": 0
                , "retypedPassword": 0
            }
            , function (err, data) {
                if (err) {
                    console.error(err);
                    res.status(404).send();
                    return;
                } else {
                    res.status(200).send(data);
                }
            });
    });
});

router.post("/update", function (req, res, next) {
    /**
     * TODO
     * Napisać testy
     * Walidacja przesłanych danych
     * Przypadki brzegowe
     */
    var usr = req.body.user;
    var login = usr.login;

    delete usr.login;

    mongo.connect("projekt", ["user"], function (db) {
        db.user.update({
                login: login
            },
            {
                "$set": usr
            },
            function (err, data) {
                if (err) {
                    res.status(500).send(err);
                }
                res.status(200).send(data);
            });
    });
});

router.post("/remove", function (req, res, next) {
    /**
     * TODO
     * Napisać testy
     * Co, gdy dane są błędne? itd
     */
    var usr = req.body.user;
    mongo.connect("projekt", ["user"], function (db) {
        db.user.remove({"login": usr.login},
            function (err, data) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(200).send("ok");
                }
            });
    })
});


function closeDB(db) {
    db.close();
}

function removeSensitiveUserData(User) {
    delete User["password"];
    delete User["retypedPassword"];
    return User;
}
function removeSensitiveUserDataArray(array) {
    array.forEach(function (user) {
        user = removeSensitiveUserData(user);
    });
    return array;
}
module.exports = router;