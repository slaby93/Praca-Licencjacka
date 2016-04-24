var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var assert = require('assert');
var mongo = require('./dbConnect.js');
var tokenHandler = require("./tokenHandler");
var jwt = require('express-jwt');
var secret = new Buffer('a2571790-c4a2-4f1c-b5d0-a54bcfc0b98f', 'base64');
var auth = jwt({secret: secret, userProperty: 'payload'});
var https = require('https');
var guard = require('express-jwt-permissions')({
    requestProperty: 'payload',
    permissionsProperty: 'groups'
})
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
        db.user.findOne({"login": req.body.login}, function (err, foundedUser) {
            //niepoprawny login
            if (foundedUser === undefined || foundedUser === null) {
                return res.status(400).json({message: 'Użytkownik nie istnieje, wpisz poprawny login!'}).end(function () {
                    db.close();
                });
            }
            //poprawne haslo po weryfikacji biblioteki bcrypt
            if (bcrypt.compareSync(req.body.password, foundedUser.password)) {
                // generowanie tokena
                tokenHandler.generateJWT(foundedUser._id, foundedUser.groups, function (token) {
                    //usuwanie newralgicznych dla bezpieczenstwa informacji
                    foundedUser = removeSensitiveUserData(foundedUser);
                    //zwrot informacji o uzytkowniku oraz wygenerowanego tokena
                    res.status(200).json({"user": foundedUser, "token": token}).end(function () {
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
        return res.status(400).json({message: 'Proszę wypełnić wszystkie pola!'});
    }
    //niepasujace hasla
    if (req.body.password !== req.body.retypedPassword) {
        console.error("REGISTER ERROR : Hasła się nie zgadzają");
        return res.status(400).json({message: 'Proszę wpisać pasujące hasła!'});
    }
    var user = req.body;
    var password = bcrypt.hashSync(req.body.password, 10);
    user = removeSensitiveUserData(user);
    user.password = password;
    user.groups = ['user'];
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
            //dodanie uzytkownika do bazy
            db.user.insert(user);
            getUserByLogin(user.login, [], function (data) {
                "use strict";
                // generates token
                tokenHandler.generateJWT(data._id, data.groups, function (token) {
                    res.status(200).json({token: token, user: removeSensitiveUserData(data)}).end(function () {
                        db.close();
                    });
                });

            });

        });
    });
});

router.post('/token', function (req, res, next) {
    var token = req.body.token;
    var decodedToken = tokenHandler.decodeToken(token, false);


    if (decodedToken === null) {
        res.status(406).send("Token is invalid");

        return;
    }

    mongo.connect("projekt", ["user"], function (db) {
        db.user.findOne({"_id": mongo.ObjectId(decodedToken._id)}, function (err, foundedUser) {
            if (err) {
                res.status(500).send("Token is valid, but error when fetching from db").end(function () {
                    db.close();
                });
                return;
            }
            // nie znaleziono uzytkownika w bazie
            if (foundedUser === undefined || foundedUser === null) {
                res.status(500).send("User not found").end(function () {
                    db.close();
                });
                return;
            }
            if (JSON.stringify(foundedUser.groups) !== JSON.stringify(decodedToken.groups)) {
                res.status(500).send("Groups are invalid").end(function () {
                    db.close();
                });
                return;
            }
            foundedUser = removeSensitiveUserData(foundedUser);
            res.status(200).send(foundedUser).end(function () {
                db.close();
            });
        });
    });
});

router.post('/refresh', function (req, res, next) {
    var token = req.body.token;
    var decodedToken = tokenHandler.decodeToken(token, true);

    if (decodedToken === null) {
        res.status(406).send("Token is invalid");

        return;
    }

    tokenHandler.verifyToken(decodedToken, function (result) {
        if (!result) {
            res.status(401).send("Token is invalid");
            return;
        }
        tokenHandler.generateJWT(decodedToken._id, decodedToken.groups, function (token) {
            res.status(200).json({"token": token});
        });
    });
});

router.post('/all', auth, guard.check('user'), function (req, res, next) {
    tokenHandler.verifyToken(req.payload, function (result) {
        if (!result) {
            res.status(401).send("Token is invalid");
            return;
        }
        mongo.connect("projekt", ["user"], function (db) {
            db.user.find({}, {
                    "password": 0
                    , "retypedPassword": 0
                }
                , function (err, data) {
                    if (err) {
                        console.error(err);
                        res.status(404).send().end(function () {
                            db.close();
                        });
                        return;
                    } else {
                        res.status(200).send(data).end(function () {
                            db.close();
                        });
                    }
                });
        });
    });
});

router.post("/update", auth, guard.check('user'), function (req, res, next) {
    /**
     * TODO
     * Napisać testy
     * Walidacja przesłanych danych
     * Przypadki brzegowe
     */
    tokenHandler.verifyToken(req.payload, function (result) {
        if (!result) {
            res.status(401).send("Token is invalid");
            return;
        }
        var usr = req.body.user;
        var id = usr.id;
        delete usr.id;
        mongo.connect("projekt", ["user"], function (db) {
            db.user.update({
                    _id: mongo.ObjectId(id)
                },
                {
                    "$set": usr
                },
                function (err, data) {
                    if (err) {
                        res.status(500).send(err).end(function () {
                            db.close();
                        });
                    }
                    res.status(200).send(data).end(function () {
                        db.close();
                    });
                });
        });
    });
});

router.post("/autocomplete", function (req, res, next) {
    var query = req.body.query;
    var location = req.body.location;
    var url = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + query + '&location=' + location[0] + ',' + location[1] + '&types=geocode&components=country:pl&language=pl&key=AIzaSyCdp3QzFm-6Xp1qULwW4JPMJiYX0lydf-o';
    var result = '';
    https.request(url, function (response) {
        response.on('data', function (dane) {
            result += dane;
        })
        response.on('end', function (dane) {
            res.end(result);
        })
    }).end();
});


router.post("/remove", auth, guard.check('user'), function (req, res, next) {
    /**
     * TODO
     * Napisać testy
     * Co, gdy dane są błędne? itd
     */
    tokenHandler.verifyToken(req.payload, function (result) {
        if (!result) {
            res.status(401).send("Token is invalid");
            return;
        }
        var usr = req.body.user;
        mongo.connect("projekt", ["user"], function (db) {
            db.user.remove({"login": usr.login},
                function (err, data) {
                    if (err) {
                        res.status(500).send(err).end(function () {
                            db.close();
                        });
                    } else {
                        res.status(200).send("ok").end(function () {
                            db.close();
                        });
                    }
                });
        })
    });
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

/**
 *
 */
function getUserByLogin(login, attributes, callback) {
    "use strict";
    mongo.connect("projekt", ["user"], function (db) {
        db.user.findOne({
            "login": login
        }, function (err, foundedUser) {
            if (err || foundedUser === undefined || foundedUser === null) {
                return undefined;
            }
            (callback) ? callback(foundedUser) : false;
            return foundedUser;
        });
    });
}

module.exports = router;