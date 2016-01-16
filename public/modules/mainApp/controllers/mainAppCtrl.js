angular.module("mainApp").controller("mainAppCtrl", ["$scope", "socketService", "userService", "$state", "$uibModal","localStorageService", mainAppCtrl]);
/**
 * @description Glowny, najbardziej zewnetrzny kontroler. Kod z tego pliku wykona sie na kazdej podstronie.
 * @param {type} $scope
 * @returns {undefined}
 */
function mainAppCtrl($scope, socketService, userService, $state, $uibModal, localStorageService) {



    //socketService.init();
    $scope.x= 10;
    $scope.testowyLogout = function () {
        console.log("TEST");
        //userService.logout();
        //$state.go("login");
    };


    $scope.logout = function(){
        userService.logout();
        $scope.isLogged = false;
    }


    $scope.openLoginRegister = function(){
        var modalInstance = $uibModal.open(
            {
                templateUrl: 'modules/mainApp/views/login_registerView.html',
                controller: 'login_registerCtrl',
                backdrop: "static",
                resolve: {
                    isLogged : function() {
                        return $scope.isLogged;
                    }
                }
            }
        );

        modalInstance.result.then(function (is) {
            $scope.isLogged = is;
        }, function () {
        });
    };


    /**
     * @description Funkcja inicjalizujaca i ew. przekierowujaca do cms, gdy uzytkownik jest juz zalogowany.
     */
    function initLogin() {
        $scope.userLogin = {
            "login": "",
            "password": ""
        };
        var token = localStorageService.get("token");
        if (token) {
            userService.loginByToken(token).then(
                // SUCCESS
                function (message) {
                    $scope.isLogged = true;
                    /*$state.go("cms");*/
                    // ERROR
                }, function (message) {
                    console.log(message.data);
                    $scope.isLogged = false;
                    // usuwamy niepoprawny token
                    localStorageService.remove("token");
                    // MESSAGE
                }, function (message) {
                    $scope.isLogged = false;
                    console.log(message);
                });
        } else {
            $scope.isLogged = false;
            console.log("Token is empty!");
        }
    }

    initLogin();
    

}
