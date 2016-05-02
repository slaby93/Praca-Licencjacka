var express = require('express');
var router = express.Router();
var tokenHandler = require("./tokenHandler");
var mongo = require('./dbConnect.js');
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
				"createdDate" : passedEvent.createdDate,
				"date" : passedEvent.date,
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
	tokenHandler.verifyToken(req.payload, function(result) {
		if (!result) {
			res.status(401).send("Token is invalid");
			return;
		}
		//dosth

	});
});


router.post('/kickUser', auth, guard.check('user'), function (req, res, next) {
	tokenHandler.verifyToken(req.payload, function(result) {
		if (!result) {
			res.status(401).send("Token is invalid");
			return;
		}
		//dosth

	});
});


router.post('/remove', auth, guard.check('user'), function (req, res, next) {
	tokenHandler.verifyToken(req.payload, function(result) {
		if (!result) {
			res.status(401).send("Token is invalid");
			return;
		}
		//dosth

	});
});


router.post('/deactivate', auth, guard.check('user'), function (req, res, next) {
	tokenHandler.verifyToken(req.payload, function(result) {
		if (!result) {
			res.status(401).send("Token is invalid");
			return;
		}
		//dosth

	});
});



router.post('/deactivateByDate', auth, guard.check('user'), function (req, res, next) {
	tokenHandler.verifyToken(req.payload, function(result) {
		if (!result) {
			res.status(401).send("Token is invalid");
			return;
		}
		//dosth

	});
});


router.post('/dezactivateById', auth, guard.check('user'), function (req, res, next) {
	tokenHandler.verifyToken(req.payload, function(result) {
		if (!result) {
			res.status(401).send("Token is invalid");
			return;
		}
		//dosth

	});
});


router.post('/isActive', auth, guard.check('user'), function (req, res, next) {
	tokenHandler.verifyToken(req.payload, function(result) {
		if (!result) {
			res.status(401).send("Token is invalid");
			return;
		}
		//dosth

	});
});


router.post('/cleanOld', auth, guard.check('user'), function (req, res, next) {
	tokenHandler.verifyToken(req.payload, function(result) {
		if (!result) {
			res.status(401).send("Token is invalid");
			return;
		}
		//dosth

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