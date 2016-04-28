/**
 * Created by Tomek on 28.04.2016.
 */
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

/**
 * @description Wysylanie zdjec za pomoca biblioteki Formidable
 * @param req
 * @param destination
 * @param callback
 */
exports.upload = function (req, destination, callback) {
    var form = new formidable.IncomingForm();
	
	form.parse(req, function (err, fields, files) {
		var file = files.file;
		var name = fields.name;
		var tempPath = file.path;
		var targetPath = path.resolve('./public/gallery/' + destination);
		if (fs.existsSync(targetPath) === false) {
			fs.mkdirSync(targetPath);
		}
		fs.rename(tempPath, targetPath + '/' + name + '.jpg', function (err) {
			if (err) {
				callback(false, undefined);
				return;
			}
			callback(true, {path: 'gallery/' + destination + '/' + name + '.jpg'});
		})
	});
};