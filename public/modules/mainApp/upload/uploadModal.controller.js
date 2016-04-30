/**
 * Created by Tomek on 29/04/16.
 */

class UploadModalController {
    constructor(Upload, $timeout, loader, UserService) {
        let self = this;
        self.Upload = Upload;
        self.$timeout = $timeout;
        self.loader = loader;
        self.UserService = UserService;
    }
	
	/**
     * Remove modal from screen
     */
    closeModal() {
        let self = this;
        self.$mdDialog.hide()
    }
	
	/**
     * Upload image to server
     */
	upload(dataUrl, name, url) {
		let self = this;
		self.loader.show();
		self.Upload.upload({
			url: url,
			data: {name: name, file: self.Upload.dataUrltoBlob(dataUrl, name)},
		}).then(function (response) {
			self.$timeout(function () {
				self.result = response.data;
				self.loader.hide();
			});
		}, function (response) {
			if (response.status > 0) {
				self.errorMsg = response.status + ': ' + response.data;
			}
			self.loader.hide();
		}, function (evt) {
			self.progress = parseInt(100.0 * evt.loaded / evt.total);
		});
	}
    
}

export default UploadModalController;