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
		var authorID = new ObjectId(passedComment.authorID);
		var recipientID = new ObjectId(passedComment.recipientID);
		var doc = {
			"authorID": authorID,
			"recipientID": recipientID,
			"date": new Date(),
			"grade": passedComment.grade,
			"authorRole": passedComment.authorRole,
			"content": passedComment.content,
			"response": passedComment.response
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
    var recipientID = new ObjectId(req.body.recipientID);
    mongo.connect("serwer", ["comment"], function (db) {
        db.comment.find({"recipientID": recipientID}, {"_id": 0, "recipientID": 0}).sort({date: -1}, function (err, data) {
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
    var authorID = new ObjectId(req.body.authorID);
    mongo.connect("serwer", ["comment"], function (db) {
        db.comment.find({"authorID": authorID}, {"_id": 0, "authorID": 0}).sort({date: -1}, function (err, data) {
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
    var recipientID = new ObjectId(req.body.recipientID);
    mongo.connect("serwer", ["comment"], function (db) {
		db.comment.aggregate(
			[
				{$match: {"recipientID": recipientID}},
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