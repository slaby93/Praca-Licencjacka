/**
 * Created by Slaby on 02.01.2016.
 */
var jwt = require('jsonwebtoken');

/**
 * @description Generowanie tokenow za pomoca biblioteki JWT
 * @param passedUser
 * @param callback
 */
exports.generateJWT = function (ID, groups, callback) {
    var today = new Date();
    var expire = new Date(today);
    // jak dlugo token ma byc uznawany za poprawny
	expire.setTime(today.getTime() + 7200000);
    // generowanie tokena, 1 argumentem są zakodowane dane
    jwt.sign({"_id": ID,
		"groups": groups,
		"exp": parseInt(expire.getTime() / 1000)
	}, "SECRET", {"algorithm": "HS256"}, function (token) {
        if (callback) {
            callback(token);
        }
    });
};
/**
 * @description Dekoduje otrzymany token
 * @param token
 */
exports.decodeToken = function (token) {
    try {
        var decoded = jwt.verify(token, "SECRET");
        delete decoded["iat"];
        return decoded;
    } catch (err) {
        console.log(err);
        return null;
    }
};