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
	tokenHandler.verifyToken(req.payload, function(result) {
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
				"author" : passedEvent.author,
				"createdDate" : new Date(passedEvent.createdDate),
				"date" : new Date(passedEvent.date),
				"isActive" : true,
				"localization" : {
					"latitude" : passedEvent.localization.latitude,
					"longitude" : passedEvent.localization.longitude
				},
				"eventInfo" : {
					"description" : passedEvent.eventInfo.description,
					"payment" : passedEvent.eventInfo.payment,
					"ownEquipment" : passedEvent.eventInfo.ownEquipment,
					"experienced" : passedEvent.eventInfo.experienced,
					"usersLimit" : passedEvent.eventInfo.usersLimit,
				},
				"defaultEventImage" : passedEvent.defaultEventImage,
				"defaultEventIcon" : passedEvent.defaultEventIcon,
				"participants" : passedEvent.participants
			};
			
			//dodanie eventu do bazy
			db.event.insert(doc, function (err, data) {
				if (err) {
					res.status(404).send().end(function () {
						db.close();
					});
					return;
				} else {
					res.status(200).send({"id" : doc._id}).end(function () {
						db.close();
					});
				}
			  }
			);
		});
    });
});

router.post('/update', auth, guard.check('user'), function (req, res, next) {
	tokenHandler.verifyToken(req.payload, function(result) {
		if (!result) {
			res.status(401).send("Token is invalid");
			return;
		}
		//dosth

	});
});

router.post('/joinEvent', auth, guard.check('user'), function (req, res, next) {
	tokenHandler.verifyToken(req.payload, function (result) {
		if (!result) {
			res.status(401).send("Token is invalid");
			return;
		}
		var id = new ObjectId(req.body.id);
		var name = req.body.name;
		mongo.connect("serwer", ["event"], function (db) {
		
			//switching the isActive to false for the found event
			db.event.update(
				{"_id": id},
				{$addToSet: 
					{"participants" :
						{"name" : name}
					}
				},
				function (err, data) {
					if (err) {
						res.status(404).send().end(function () {
							db.close();
						});
						return;
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
		var name = req.body.name;
		mongo.connect("serwer", ["event"], function (db) {
		
			//switching the isActive to false for the found event
			db.event.update(
				{"_id": id},
				{$pull: 
					{"participants" :
						{"name" : name}
					}
				},
				function (err, data) {
					if (err) {
						res.status(404).send().end(function () {
							db.close();
						});
						return;
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


router.post('/remove', auth, guard.check('user'), function (req, res, next) {
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
				{_id : 0, participants : 1},
				function (err, data) {docs = data;}
			);
			//switching the isActive to false for the found event
			db.event.remove(
				{"_id": id},
				function (err, data) {
					if (err) {
						res.status(404).send().end(function () {
							db.close();
						});
						return;
					} else {
						res.status(200).send({"docs" : docs}).end(function () {
							db.close();
						});
					}
				}
			);
		});
    });
});

router.post('/checkForEventsToDeactivate', auth, guard.check('user'), function (req, res, next) {
	tokenHandler.verifyToken(req.payload, function (result) {
		if (!result) {
			res.status(401).send("Token is invalid");
			return;
		}
		var currentDate = new Date();
		var docs = [];
		mongo.connect("serwer", ["event"], function (db) {
			db.event.find(
				{$and: [{"date": {$lte: currentDate}},{"isActive" : true}]},
				{_id : 0, participants : 1},
				function (err, data) {docs = data;}
			);
			//switching the isActive to false for the found events
			db.event.update(
				{$and: [{"date": {$lte: currentDate}},{"isActive" : true}]},
				{$set: {"isActive" : false}},
				{multi: true},
				function (err, data) {
					if (err) {
						res.status(404).send().end(function () {
							db.close();
						});
						return;
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


router.post('/deactivateById', auth, guard.check('user'), function (req, res, next) {
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
				{_id : 0, participants : 1},
				function (err, data) {docs = data;}
			);
			//switching the isActive to false for the found event
			db.event.update(
				{"_id": id},
				{$set: {"isActive" : false}},
				{ multi: true },
				function (err, data) {
					if (err) {
						res.status(404).send().end(function () {
							db.close();
						});
						return;
					} else {
						res.status(200).send({"docs" : docs}).end(function () {
							db.close();
						});
					}
				}
			);
		});
    });
});


router.post('/isActive', auth, guard.check('user'), function (req, res, next) {
	tokenHandler.verifyToken(req.payload, function (result) {
		if (!result) {
			res.status(401).send("Token is invalid");
			return;
		}
		var id = new ObjectId(req.body.id);
		mongo.connect("serwer", ["event"], function (db) {
		
			//switching the isActive to false for the found event
			db.event.find(
				{"_id": id},
				{_id : 0, isActive : 1},
				function (err, data) {
					if (err) {
						res.status(404).send().end(function () {
							db.close();
						});
						return;
					} else {
						res.status(200).send({"isActive" : data}).end(function () {
							db.close();
						});
					}
				}
			);
		});
    });
});


router.post('/cleanOld', auth, guard.check('user'), function (req, res, next) {
	tokenHandler.verifyToken(req.payload, function(result) {
		if (!result) {
			res.status(401).send("Token is invalid");
			return;
		}
		
		var currentDate = new Date();
		currentDate.setDate(currentDate.getDate()-365);
		var docs = [];
		mongo.connect("serwer", ["event"], function (db) {
		
			//finding all inactive events, which are older than year (only for returning their id's for deleting icons)
			db.event.find(
				{$and: [{"date": {$lte: currentDate}},{"isActive" : false}]},
				{ _id:1 }, function (err, data)  {docs = data;}
			);
			//finding all inactive events, which are older than year and deleting them
			db.event.remove(
				{$and: [{"date": {$lte: currentDate}},{"isActive" : false}]}, 
				function (err, data) {
					if (err) {
						res.status(404).send().end(function () {
							db.close();
						});
						return;
					} else {
						res.status(200).send({"docs" : docs}).end(function () {
							db.close();
						});
					}
				}
			);
		});
	});
});


router.post('/find', auth, guard.check('user'), function (req, res, next) {
	tokenHandler.verifyToken(req.payload, function(result) {
		if (!result) {
			res.status(401).send("Token is invalid");
			return;
		}
		//dosth

	});
});


router.post('/findFromUser', auth, guard.check('user'), function (req, res, next) {
	tokenHandler.verifyToken(req.payload, function(result) {
		if (!result) {
			res.status(401).send("Token is invalid");
			return;
		}
		//dosth

	});
});



module.exports = router;