/**
 * Created by Slaby on 02.12.2015.
 */

angular.module("cmsModule").controller("indexCmsCtrl", ["$scope", "$ocLazyLoad", indexCmsCtrl]);

function indexCmsCtrl($scope, $ocLazyLoad) {
    "use strict";
    // laduje inicjalizator calego AdminLte2
    $ocLazyLoad.load('modules/cms/lib/AdminLte2/app.js');
}