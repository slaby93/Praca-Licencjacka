/**
 * Created by Slaby on 02.01.2016.
 */
var jwt = require('jsonwebtoken');
var mongo = require('./dbConnect.js');
var secret = new Buffer('a2571790-c4a2-4f1c-b5d0-a54bcfc0b98f', 'base64');

/**
 * @description Generowanie tokenow za pomoca biblioteki JWT
 * @param ID
 * @param groups
 * @param callback
 */
exports.generateJWT = function (ID, groups, callback) {
    var today = new Date();
    var expire = new Date(today);
    // jak dlugo token ma byc uznawany za poprawny
	expire.setTime(today.getTime() + 60000);
    // generowanie tokena, 1 argumentem są zakodowane dane
    jwt.sign({"_id": ID,
		"groups": groups,
		"exp": parseInt(expire.getTime() / 1000)
	}, secret, {"algorithm": "HS256"}, function (token) {
        if (callback) {
            callback(token);
        }
    });
};
/**
 * @description Dekoduje otrzymany token
 * @param token
 */
exports.decodeToken = function (token, ignoreExp) {
    try {
        var decoded = jwt.verify(token, secret, {ignoreExpiration: ignoreExp});
        delete decoded["iat"];
        return decoded;
    } catch (err) {
        console.log(err);
        return null;
    }
};
/**
 * @description Porownuje otrzymany token z baza danych
 * @param authorization
 * @param callback
 */
exports.verifyToken = function (authorization, callback) {
	var token = authorization.split(' ')[1];
    var decodedToken = jwt.decode(token);
	mongo.connect("projekt", ["user"], function (db) {
        db.user.findOne({"_id": mongo.ObjectId(decodedToken._id)}, function (err, foundedUser) {
            if (err) {
                callback(false);
				return;
            }
            // nie znaleziono uzytkownika w bazie
            if (foundedUser === undefined || foundedUser === null) {
                callback(false);
				return;
            }
			if (JSON.stringify(foundedUser.groups) !== JSON.stringify(decodedToken.groups)) {
				callback(false);
				return;
            }
			callback(true);
        });
    });
};