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

router.post('/add', auth, guard.check('user'), function (req, res, next) {
    tokenHandler.verifyToken(req.payload, function (result) {
        if (!result) {
            res.status(401).send("Token is invalid");
            return;
        }
		var passedComment = req.body.comment;
		var doc = {
			"author": comment.author,
			"recipient": comment.recipient,
			"grade": comment.grade,
			"authorRole": comment.authorRole,
			"content": comment.content,
			"response": comment.response
		};
		mongo.connect("serwer", ["comment"], function (db) {
			db.comment.insert(doc, function (err, data) {
				if (err) {
					res.status(400).send(err).end(function () {
						db.close();
					});
				} else {
					res.status(200).send(data).end(function () {
						db.close();
					});
				}
			});
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
        mongo.connect("serwer", ["comment"], function (db) {
            db.comment.remove({"_id": id}, function (err, data) {
				if (err) {
					res.status(400).send(err).end(function () {
						db.close();
					});
				} else {
					res.status(200).send("ok").end(function () {
						db.close();
					});
				}
            });
        });
    });
});

router.post('/findByRecipient', function (req, res, next) {
    var recipient = req.body.recipient;
    mongo.connect("serwer", ["comment"], function (db) {
        db.comment.find({"recipient": recipient}, {"_id": 0, "recipient": 0}, function (err, data) {
			if (err) {
				res.status(400).send("Error when fetching from db").end(function () {
					db.close();
				});
			} else {
				res.status(200).send(data).end(function () {
					db.close();
				});
			}
		});
    });
});

router.post('/findByAuthor', function (req, res, next) {
    var author = req.body.author;
    mongo.connect("serwer", ["comment"], function (db) {
        db.comment.find({"author": author}, {"_id": 0, "author": 0}, function (err, data) {
			if (err) {
				res.status(400).send("Error when fetching from db").end(function () {
					db.close();
				});
			} else {
				res.status(200).send(data).end(function () {
					db.close();
				});
			}
		});
    });
});

router.post('/count', function (req, res, next) {
    var recipient = req.body.recipient;
    mongo.connect("serwer", ["comment"], function (db) {
		db.comment.aggregate(
			[
				{$match: {"recipient": recipient}},
				{$group : {_id: {grade: "$grade"}, count: {$sum: 1}}}
			], function (err, data) {
				if (err) {
					res.status(404).send().end(function () {
						db.close();
					});
				} else {
					res.status(200).send(data).end(function () {
						db.close();
					});
				}
			}
		);
    });
});

module.exports = router;