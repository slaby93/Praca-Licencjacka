/**
 * Created by Slaby on 29.11.2015.
 */
/**
 *
 * @param callback funkcja wywolana po polaczeniu z baza. Pamietaj o db.close()
 */
var mongojs = require('mongojs');
var db;
exports.connect = function (callback) {
    if (process.env.OPENSHIFT_NODEJS_IP === undefined) {
        console.log("Projekt podlaczony lokalnie");
        db = mongojs('admin:CbginbLnch_c@localhost/projekt', ['test']);
    }else{
        console.log("Projekt podlaczony zdalnie");
        db = mongojs('admin:CbginbLnch_c@127.8.89.130/projekt', ['test']);
    }

    if (callback) {
        callback(db);
    } else {
        db.close();
    }
};

exports.disconnect = function (callback) {
    db.close();
    console.log("Disconnected from database");
    if (callback) {
        callback();
    }
};