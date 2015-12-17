/**
 * Created by Slaby on 25.11.2015.
 */

angular.module("userModule", ["LocalStorageModule"]).config(function (localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('myApp')
        .setStorageType('localStorage')
        .setNotify(true, true);
});

 