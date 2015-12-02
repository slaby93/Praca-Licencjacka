/**
 * Created by Slaby on 02.12.2015.
 */
angular.module("cmsModule").service("adminTemplateService", ["$http", adminTemplateService]);

function adminTemplateService($http) {
    /**
     * @description Pobiera z bazy danych liste zakladek dla side menu templatki Admina
     */

    var cmsConfig = null;
    this.getCmsConfig = function (callback) {
        "use strict";
        $http.get("/cms").success(function (data) {
            if (callback) {
                callback(data);
            }
        });
    };
}