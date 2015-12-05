/**
 * Created by pufek on 05.12.2015.
 */

angular.module("cmsModule").controller("imageUploadCtrl", ["$scope","FileUploader", imageUploadCtrl]);

function imageUploadCtrl($scope,FileUploader) {
    // https://github.com/nervgh/angular-file-upload/wiki/Introduction
    $scope.uploader = new FileUploader();


}
