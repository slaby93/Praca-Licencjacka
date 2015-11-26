angular.module("mainApp")
        .service("testService", ["$http", testService]);

function testService($http) {
    this.testRestow = function (callback) {
        // tutaj mozecie dac get,post itd wszystkie :) bo jest po stronie 
        // //serwera zadeklarowany jako router.all
        $http.get("/testowo").success(function (data) {
            if (callback) {
                callback(data);
            }
        });
    };
    this.test= function(){
        "use strict";
        return 2;
    }
}