/**
 * Created by pufek on 05.12.2015.
 */

angular.module("cmsModule").controller("imageUploadCtrl", ["$scope","FileUploader", imageUploadCtrl]);

function imageUploadCtrl($scope,FileUploader) {
    // https://github.com/nervgh/angular-file-upload/wiki/Introduction
    $scope.uploader = new FileUploader();

    $scope.uploader.filters.push({
        name: 'debug_printInfo',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            alert("item.type " + item.type); //MIME type
            alert("item.size " + item.size); //File size in bytes
            alert("item.formData " + item.formData);
            return true;
        }
    });
    $scope.uploader.filters.push({
        name: 'imageFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });
    $scope.uploader.filters.push({
        name: 'sizeFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return (item.size > 0 && item.size <= 3000000);
        }
    });

}
