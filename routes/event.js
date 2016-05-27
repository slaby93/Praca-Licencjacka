var express = require('express');
var router = express.Router();
var tokenHandler = require("./tokenHandler");
var mongo = require('./dbConnect.js');
var ObjectId = mongo.ObjectId;
var jwt = require('express-jwt');
var secret = new Buffer('a2571790-c4a2-4f1c-b5d0-a54bcfc0b98f', 'base64');
var auth = jwt({secret: secret, userProperty: 'payload'});
var guard = require('express-jwt-permissions')({
    requestProperty: 'payload',
    permissionsProperty: 'groups'
})
var uploadHandler = require("./uploadHandler");

router.post('/icon', auth, guard.check('user'), function (req, res, next) {
    tokenHandler.verifyToken(req.payload, function (result) {
        if (!result) {
            res.status(401).send("Token is invalid");
            return;
        }
        uploadHandler.upload(req, 'icon', function (result, json) {
            if (!result) {
                res.status(500).send("Error while file writing");
                return;
            }
            res.status(200).json(json);
        });

    });
});


router.post('/addEvent', auth, guard.check('user'), function (req, res, next) {
    tokenHandler.verifyToken(req.payload, function (result) {
        if (!result) {
            res.status(401).send("Token is invalid");
            return;
        }
        var passedEvent = req.body.event;
        mongo.connect("serwer", ["event"], function (db) {

            //creation of document to insert
            var doc = {
                "authorID": new ObjectId(passedEvent.authorID),
                "createdDate": new Date(passedEvent.createdDate),
                "date": new Date(passedEvent.date),
                "isActive": true,
                "localization": {
                    "latitude": passedEvent.localization.latitude,
                    "longitude": passedEvent.localization.longitude
                },
                "eventInfo": {
                    "description": passedEvent.eventInfo.description,
                    "category": passedEvent.eventInfo.category,
                    "payment": passedEvent.eventInfo.payment,
                    "ownEquipment": passedEvent.eventInfo.ownEquipment,
                    "experience": passedEvent.eventInfo.experience,
                    "usersLimit": passedEvent.eventInfo.usersLimit,
                    "title": passedEvent.eventInfo.title
                },
                "eventIcon": passedEvent.eventIcon,
                "participants": passedEvent.participants
            };

            //dodanie eventu do bazy
            db.event.insert(doc, function (err, data) {
                if (err) {
                    res.status(404).send().end(function () {
                        db.close();
                    });
                } else {
                    res.status(200).send({"id": doc._id}).end(function () {
                        db.close();
                    });
                }
            });
        });
    });
});

router.post('/update', auth, guard.check('user'), function (req, res, next) {
    tokenHandler.verifyToken(req.payload, function (result) {
        if (!result) {
            res.status(401).send("Token is invalid");
            return;
        }
        var passedEvent = req.body.passedEvent;
        var id = new ObjectId(req.body.id);
		
		query = {};
		query['participants.'+passedEvent.eventInfo.usersLimit] = {$exists : false};
		
        mongo.connect("serwer", ["event"], function (db) {
            db.event.update(
                {$and :[
					{"isActive": true},
					{"_id": id},
					query,
					{$where : "(new Date()) < this.date"}
				]},
                {
                    $set: {
                        "date": new Date(passedEvent.date),
                        "localization": {
                            "latitude": passedEvent.localization.latitude,
                            "longitude": passedEvent.localization.longitude
                        },
                        "eventInfo": {
                            "description": passedEvent.eventInfo.description,
                            "category": passedEvent.eventInfo.category,
                            "payment": passedEvent.eventInfo.payment,
                            "ownEquipment": passedEvent.eventInfo.ownEquipment,
                            "experience": passedEvent.eventInfo.experience,
                            "usersLimit": passedEvent.eventInfo.usersLimit,
                            "title": passedEvent.eventInfo.title
                        },
                        "eventIcon": passedEvent.eventIcon
                    }
                }, function (err, data) {
                    if (err) {
                        res.status(404).send().end(function () {
                            db.close();
                        });
                    } else if (data.nModified == 0) {
                        res.status(200).send("nochange").end(function () {
                            db.close();
                        });
                    } else {
                        res.status(200).send("ok").end(function () {
                            db.close();
                        });
                    }
                }
            );
        });
    });
});

router.post('/joinEvent', auth, guard.check('user'), function (req, res, next) {
    tokenHandler.verifyToken(req.payload, function (result) {
        if (!result) {
            res.status(401).send("Token is invalid");
            return;
        }
        var id = new ObjectId(req.body.id);
        var userID = new ObjectId(req.body.userID);
        mongo.connect("serwer", ["event"], function (db) {
            db.event.update(
                {$and :[
                    {"isActive": true},
                    {"_id": id},
                    {$where : "this.participants.length < this.eventInfo.usersLimit && (new Date()) < this.date"}
                ]},
                {$addToSet: {"participants": {"_id" : userID}}},
                function (err, data) {
                    if (err) {
                        res.status(404).send().end(function () {
                            db.close();
                        });
                    }else if (data.nModified == 0){
                        res.status(200).send("nochange").end(function () {
                            db.close();
                        });
                    } else {
                        res.status(200).send("ok").end(function () {
                            db.close();
                        });
                    }
                }
            );
        });
    });
});


router.post('/kickUser', auth, guard.check('user'), function (req, res, next) {
    tokenHandler.verifyToken(req.payload, function (result) {
        if (!result) {
            res.status(401).send("Token is invalid");
            return;
        }
        var id = new ObjectId(req.body.id);
        var userID = new ObjectId(req.body.userID);
        mongo.connect("serwer", ["event"], function (db) {
            db.event.update(
                {$and :[
                    {"isActive": true},
                    {"_id": id},
                    {$where : "(new Date()) < this.date"}
                ]},
                {$pull: {"participants": {"_id" : userID}}},
                function (err, data) {
                    if (err) {
                        res.status(404).send().end(function () {
                            db.close();
                        });
                    }else if (data.nModified == 0){
                        res.status(200).send("nochange").end(function () {
                            db.close();
                        });
                    } else {
                        res.status(200).send("ok").end(function () {
                            db.close();
                        });
                    }
                }
            );
        });
    });
});


router.post('/remove', auth, guard.check('admin'), function (req, res, next) {
    tokenHandler.verifyToken(req.payload, function (result) {
        if (!result) {
            res.status(401).send("Token is invalid");
            return;
        }
        var id = new ObjectId(req.body.id);
        var docs = [];
        mongo.connect("serwer", ["event"], function (db) {
            db.event.find(
                {"_id": id},
                {_id: 0, participants: 1},
                function (err, data) {
                    docs = data;
                }
            );
            db.event.remove(
                {"_id": id},
                function (err, data) {
                    if (err) {
                        res.status(404).send().end(function () {
                            db.close();
                        });
                    } else {
                        res.status(200).send({"docs": docs}).end(function () {
                            db.close();
                        });
                    }
                }
            );
        });
    });
});

router.post('/checkForEventsToDeactivate', function (req, res, next) {
    var currentDate = new Date();
    var docs = [];
    mongo.connect("serwer", ["event"], function (db) {
        db.event.find(
            {$and: [{"date": {$lte: currentDate}}, {"isActive": true}]},
            {participants: 1, authorID : 1},
            function (err, data) {
                docs = data;
            }
        );
        //switching the isActive to false for the found events
        db.event.update(
            {$and: [{"date": {$lte: currentDate}}, {"isActive": true}]},
            {$set: {"isActive": false}},
            {multi: true},
            function (err, data) {
                if (err) {
                    res.status(404).send().end(function () {
                        db.close();
                    });
                } else {
                    res.status(200).send({"docs": docs}).end(function () {
                        db.close();
                    });
                }
            }
        );
    });
});


router.post('/deactivateById', auth, guard.check('user'), function (req, res, next) {
    tokenHandler.verifyToken(req.payload, function (result) {
        if (!result) {
            res.status(401).send("Token is invalid");
            return;
        }
        var id = new ObjectId(req.body.id);
        var docs = [];
        var date = new Date(req.body.date);
        mongo.connect("serwer", ["event"], function (db) {

            db.event.find(
                {"_id": id},
                {_id: 0, participants: 1},
                function (err, data) {
                    docs = data;
                }
            );
            //switching the isActive to false for the found event
            db.event.update(
                {"_id": id},
                {$set: {"isActive": false, "date": date}},
                {multi: true},
                function (err, data) {
                    if (err) {
                        res.status(404).send().end(function () {
                            db.close();
                        });
                    } else {
                        res.status(200).send({"docs": docs}).end(function () {
                            db.close();
                        });
                    }
                }
            );
        });
    });
});



router.post('/cleanOld', function (req, res, next) {
    var currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - 365);
    var docs = [];
    mongo.connect("serwer", ["event"], function (db) {

        //finding all inactive events, which are older than year (only for returning their id's for deleting icons)
        db.event.find(
            {$and: [{"date": {$lte: currentDate}}, {"isActive": false}]},
            {participants: 1}, function (err, data) {
                docs = data;
            }
        );
        //finding all inactive events, which are older than year and deleting them
        db.event.remove(
            {$and: [{"date": {$lte: currentDate}}, {"isActive": false}]},
            function (err, data) {
                if (err) {
                    res.status(404).send().end(function () {
                        db.close();
                    });
                } else {
                    res.status(200).send({"docs": docs}).end(function () {
                        db.close();
                    });
                }
            }
        );
    });
});


router.post('/find', function (req, res, next) {

    var userLatitude = req.body.latitude;
    var userLongitude = req.body.longitude;
    var radius = req.body.radius;
    mongo.connect("serwer", ["event"], function (db) {
        var userLatitude = req.body.latitude;
        var userLongitude = req.body.longitude;
        var radius = req.body.radius;
        mongo.connect("serwer", ["event"], function (db) {
            db.event.find(
                {$and :[
                    {"isActive": true},
                    {$where : "(new Date()) < this.date"}
                ]}, function (err, data) {
                if (err) {
                    res.status(404).send().end(function () {
                        db.close();
                    });
                } else {
                    var docs = [];
                    data.forEach(function (event) {   //Haversine formula
                        var R = 6371; // Radius of the earth in km
                        var dLat = (userLatitude - event.localization.latitude) * (Math.PI / 180);
                        var dLon = (userLongitude - event.localization.longitude) * (Math.PI / 180);
                        var a =
                                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                                Math.cos(event.localization.latitude * (Math.PI / 180)) * Math.cos(userLatitude * (Math.PI / 180)) *
                                Math.sin(dLon / 2) * Math.sin(dLon / 2)
                            ;
                        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                        var d = R * c; // Distance in km
                        if (d <= radius) {
                            event.distance = d;
                            docs.push(event);
                        }

                    });
                    res.status(200).send({"docs": docs}).end(function () {
                        db.close();
                    });
                }
            });
        });
    });
});


router.post('/findByUser', function (req, res, next) {
    var userID = new ObjectId(req.body.userID);
    mongo.connect("serwer", ["event"], function (db) {
        db.event.aggregate(
            [
                {$match: {"_id": userID}},
                {$sort: {date: -1}}
            ], function (err, data) {
                if (err) {
                    res.status(404).send().end(function () {
                        db.close();
                    });
                } else {
                    res.status(200).send({"docs": data}).end(function () {
                        db.close();
                    });
                }
            }
        );
    });
});

router.post('/findById', function (req, res, next) {
    var id = new ObjectId(req.body.id);
    mongo.connect("serwer", ["event"], function (db) {
        db.event.find(
            {"_id": id}, function (err, data) {
                if (err) {
                    res.status(404).send().end(function () {
                        db.close();
                    });
                } else {
                    res.status(200).send({"docs": data}).end(function () {
                        db.close();
                    });
                }
            }
        );
    });
});


module.exports = router;