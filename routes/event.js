var express = require('express');
var router = express.Router();
var tokenHandler = require("./tokenHandler");
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
	console.log("lol1");
	tokenHandler.verifyToken(req.payload, function(result) {
		if (!result) {
			res.status(401).send("Token is invalid");
			return;
		}
		
		var event = req.body;
		mongo.connect("serwer", ["user"], function (db) {
			
			//dodanie eventu do bazy
			db.event.insert({
				"author" : event.author,
				"createdDate" : event.createdDate,
				"date" : event.date,
				"region" : event.region,
				"city" : event.city,
				"isActive" : true,
				"localization" : {
					"latitude" : event.localization.latitude,
					"longitude" : event.localization.longitude
				},
				"eventInfo" : {
					"description" : event.description,
					"payment" : event.payment,
					"ownEquipment" : event.ownEquipment,
					"experienced" : event.experienced,
					"usersLimit" : event.usersLimit,
				},
				"defaultEventImage" : event.defaultEventImage,
				"defaultEventIcon" : event.defaultEventIcon,
				"participants" : event.participants
			}
			, function (err, data) {
				if (err) {
					console.error(err);
					res.status(404).send().end(function () {
						db.close();
					});
					return;
				} else {
					res.status(200).send(data).end(function () {
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


router.post('/dezactivate', auth, guard.check('user'), function (req, res, next) {
	tokenHandler.verifyToken(req.payload, function(result) {
		if (!result) {
			res.status(401).send("Token is invalid");
			return;
		}
		//dosth

	});
});



router.post('/dezactivateByDate', auth, guard.check('user'), function (req, res, next) {
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