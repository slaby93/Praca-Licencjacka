
angular.module("mainApp").controller("login_registerCtrl",
    [
        "$scope",
        "$uibModalInstance",
        "$state",
        "userService",
        "localStorageService",
        "isLogged",
        login_registerCtrl
    ]
);

function login_registerCtrl($scope, $uibModalInstance, $state, userService, localStorageService, isLogged) {
    $scope.is_register_shown = false;
    $scope.feedback = "";

    $scope.showRegister = function()  {$scope.is_register_shown = true;  $scope.feedback = "";};
    $scope.showLogin = function()  {$scope.is_register_shown = false;  $scope.feedback = "";};
    $scope.cancel = function()  {$uibModalInstance.dismiss('cancel');};





    /********       LOGGING        ********/

    function clearFormLogin() {
        $scope.userLogin = {
            "login": "",
            "password": ""
        };
    }

    /**
     * @description Funkcja wywolywana przy kliknieciu buttona loguj.
     */
    $scope.loguj = function () {
        $scope.feedback = "";
        console.log($scope.userLogin);
        userService.login($scope.userLogin).then(function(message) {
            if(userService.getUser($scope.userLogin) != null){
                clearFormLogin();
                console.log(1);
                isLogged = true;
                $uibModalInstance.close(true);
            }
            else{
                console.log(2);
                clearFormLogin();
                $scope.feedback = "Niepoprawne dane logowania!";
            }
        }, function (err) {

        }, function (update) {

        });
    };


    /**************************************/




    /********       REGISTERING        ********/

    function initRegister() {
        clearFormRegister();
    }

    function clearFormRegister() {
        $scope.user = {
            "login": "",
            "password": "",
            "name": "",
            "surname": "",
            "retypedPassword": ""
        };
    }


    $scope.register = function () {
        //userService.register($scope.user,function(){
        //
        //});
        $scope.feedback = "";
        userService.register($scope.user).then(function (message) {
            $scope.feedback = "Pomyślnie zarejestrowano użytkownika!";

            $scope.userLogin = {
                "login": $scope.user.login,
                "password": $scope.user.password
            };
            $scope.loguj();

            clearFormRegister();
        }, function (err) {
            /*if(userService.getUser({"login": $scope.user.login, "password": $scope.user.password}) != null){
                $scope.feedback = "Użytkownik o takiej nazwie istnieje!"
            }else*/  $scope.feedback = "Wystąpił błąd podczas rejestracji!"
            clearFormRegister();
        }, function (update) {

        });
    };

    initRegister();







    /******************************************/

}
