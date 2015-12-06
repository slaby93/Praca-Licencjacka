/* global CryptoJS */

angular.module("cmsModule").service("imageUploadService", ["$http", imageUploadService]);
/**
 * @description Serwis odpowiedzialny za obsluge uzytkownika tj logowanie, wylogowanie, rejestracja, przechowywanie tokenu nadanego po logowaniu.
 * @param $http
 */
function imageUploadService($http) {

    this.confirmUpload = function () {
        $http.post("/cms/imageUploadRequest", {
        }).success(
            function (answer) {
                console.log(answer);
            });
    };

}