/**
 * Created by Slaby on 29.11.2015.
 */
/**
 *                      LINK DO DOKUMENTACJI MODULU MONGOJS
 *                      https://github.com/mafintosh/mongojs
 */
/**
 *
 * @param callback funkcja wywolana po polaczeniu z baza. Pamietaj o db.close()
 */
var mongojs = require('mongojs');
var ObjectId = require('mongojs').ObjectId;
var check = require('check-types');
var assert = require('assert');
var clc = require('cli-color');

var error = clc.red.bold;
var warn = clc.yellow;
var notice = clc.blue;

var db;
/**
 * @description Podlaczenie do bazy mongo. Pamietaj aby w callbacku wykonac db.close();!
 * @param callback Funkcja do ktorej wrzucone zostaja obiekty err,db.
 */
exports.ObjectId = mongojs.ObjectId;

exports.connect = function (dataBase, collectionList, callback) {

    console.log(notice("Connecting to database"));
    if (check.not.string(dataBase) || check.not.array(collectionList)) {
        // throw new Error("Parametr dataBase nie jest stringiem lub przekazana tablica nie jest tablica!");
        throw new Error("dataBase parameter is not a string or collectionList is not an array!");
    }
    if (process.env.NODE_ENV === "production") {
        db = mongojs('lokalny:lokalny@localhost/' + dataBase, collectionList);
    } else if (process.env.NODE_ENV === 'development') {

        if (process.env.localDaniel) {
            db = mongojs('slaby:daniel22@192.168.1.20/' + dataBase, collectionList);
        } else {
            db = mongojs('slaby:daniel22@letsplaypi.noip.me/' + dataBase, collectionList);
        }

    }
    db.on('error', function (err) {
        console.log(error(err));
    });
    db.on('connect', function () {
        console.log(notice('Database connected'));
    });
    if (callback) {
        callback(db);
    } else {
        db.close();
    }
};


/**
 * @description Zamyka polaczenie do bazy mongo.
 * @param callback Funkcja wywolywana po zamknieciu polaczenia.
 */
exports.disconnect = function (callback) {
    db.close();
    console.log("Disconnected from database");
    if (callback) {
        callback();
    }
};

/*********** TESTY JEDNOSTKOWE **************/
assert.throws(function () {
    exports.connect(123, ['test']);
});
assert.throws(function () {
    exports.connect("projekt", 'test');
});
assert.throws(function () {
    exports.connect(123, 123);
});