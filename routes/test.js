console.log("TEST ")
var mongojs = require('mongojs');


var db = mongojs('slaby:daniel22@ds023495.mlab.com:23495/bachelor', ['user'], {authMechanism: 'ScramSHA1'});

db.user.find(function (err, docs) {
    console.log(err);
    console.log(docs);
});