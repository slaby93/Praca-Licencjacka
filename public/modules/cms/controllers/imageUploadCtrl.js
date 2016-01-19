/**
 * Created by pufek on 05.12.2015.
 */

angular.module("cmsModule").controller("imageUploadCtrl", ["$scope", 'FileUploader', 'userService', imageUploadCtrl]).directive('ngThumb', ['$window', function ($window) {
    var helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        isFile: function (item) {
            return angular.isObject(item) && item instanceof $window.File;
        },
        isImage: function (file) {
            var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };

    return {
        restrict: 'A',
        template: '<canvas/>',
        link: function (scope, element, attributes) {
            if (!helper.support) return;

            var params = scope.$eval(attributes.ngThumb);

            if (!helper.isFile(params.file)) return;
            if (!helper.isImage(params.file)) return;

            var canvas = element.find('canvas');
            var reader = new FileReader();

            reader.onload = onLoadFile;
            reader.readAsDataURL(params.file);

            function onLoadFile(event) {
                var img = new Image();
                img.onload = onLoadImage;
                img.src = event.target.result;
            }

            function onLoadImage() {
                var width = params.width || this.width / this.height * params.height;
                var height = params.height || this.height / this.width * params.width;
                canvas.attr({width: width, height: height});
                canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
            }
        }
    };
}]);

function imageUploadCtrl($scope, FileUploader, userService) {
    //https://github.com/nervgh/angular-file-upload/wiki/Module-API
    $scope.uploader = new FileUploader({
        url: 'upload',
        removeAfterUpload: true,
        formData: [{
            token: userService.getToken()
        }]
    })
    ;
    $scope.maxFileSize = 2 * 1024 * 1024;

    $scope.uploader.filters.push({
        name: 'imageFilter',
        fn: function (item /*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    });
    $scope.uploader.filters.push({
        name: 'sizeFilter',
        fn: function (item /*{File|FileLikeObject}*/, options) {
            return (item.size <= $scope.maxFileSize);
        }
    });

    $scope.uploader.onCompleteAll = function () {
        setTimeout(function () {
            $scope.$evalAsync(function () {
                $scope.$emit("UserImageChanged");
            });
        }, 300);
    };

}
