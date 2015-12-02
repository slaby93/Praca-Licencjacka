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
var check = require('check-types');
var assert = require('assert');

var db;
/**
 * @description Podlaczenie do bazy mongo. Pamietaj aby w callbacku wykonac db.close();!
 * @param callback Funkcja do ktorej wrzucone zostaja obiekty err,db.
 */


exports.connect = function (dataBase, collectionList, callback) {
    if (check.not.string(dataBase) || check.not.array(collectionList)) {
        throw new Error("Parametr dataBase nie jest stringiem lub przekazana tablica nie jest tablica!");
    }
    // sprawdza czy uruchomiony serwer jest lokalny czy juz na openshift.
    // Na lokalnym srodowisku prosze uruchomic: rhc port-forward projekt w cmd aby sforwardowac porty dla serwera i/lub robomongo.
    if (process.env.OPENSHIFT_NODEJS_IP === undefined) {
        db = mongojs('admin:CbginbLnch_c@localhost/' + dataBase, collectionList);
    } else {
        db = mongojs('admin:CbginbLnch_c@127.8.89.130/' + dataBase, collectionList);
    }
    db.on('error', function (err) {
        assert.ifError(err);
    });
    db.on('connect', function () {
        console.log('Database connected');
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