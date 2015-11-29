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
var db;
/**
 * @description Podlaczenie do bazy mongo. Pamietaj aby w callbacku wykonac db.close();!
 * @param callback Funkcja do ktorej wrzucone zostaja obiekty err,db.
 */
exports.connect = function (callback) {
    // sprawdza czy uruchomiony serwer jest lokalny czy juz na openshift.
    // Na lokalnym srodowisku prosze uruchomic: rhc port-forward projekt w cmd aby sforwardowac porty dla serwera i/lub robomongo.
    if (process.env.OPENSHIFT_NODEJS_IP === undefined) {
        db = mongojs('admin:CbginbLnch_c@localhost/projekt', ['test']);
    } else {
        db = mongojs('admin:CbginbLnch_c@127.8.89.130/projekt', ['test']);
    }

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