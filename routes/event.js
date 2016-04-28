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

module.exports = router;