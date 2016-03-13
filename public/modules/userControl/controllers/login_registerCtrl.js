angular.module("userModule").controller("login_registerCtrl",
    [
        "$uibModalInstance",
        "userService",
        "localStorageService",
        login_registerCtrl
    ]
);

function login_registerCtrl(userService, $uibModalInstance, localStorageService) {

    var self = this;


    //$scope.is_register_shown = false;
    //$scope.is_login_clicked = false;
    //$scope.is_register_clicked = false;
    //
    //$scope.feedback = "";
    //
    //$scope.showRegister = function () {
    //    $scope.is_register_shown = true;
    //    $scope.feedback = "";
    //};
    //$scope.showLogin = function () {
    //    $scope.is_register_shown = false;
    //    $scope.feedback = "";
    //};
    //$scope.cancel = function () {
    //    $uibModalInstance.dismiss('cancel');
    //};
    //
    //
    //////TODO!!! NOW IT'S TEMPORARY
    //$scope.hasWhiteSpace = function (s) {
    //    return false;
    //};
    //
    //
    ///********       LOGGING        ********/
    //
    //function clearFormLogin() {
    //    $scope.userLogin = {
    //        "login": "",
    //        "password": ""
    //    };
    //}
    //
    //
    ///**
    // * @description Funkcja wywolywana przy kliknieciu buttona loguj.
    // */
    //$scope.loguj = function () {
    //    $scope.is_login_clicked = true;
    //    $scope.feedback = "";
    //
    //    userService.login($scope.userLogin).then(function (message) {
    //        if (userService.getUser($scope.userLogin) != null) {
    //            clearFormLogin();
    //            isLogged = true;
    //            $uibModalInstance.close(true);
    //        }
    //    }, function (err) {
    //        $scope.feedback = "Błąd podczas logowania!"
    //        $scope.is_login_clicked = false;
    //    }, function (update) {
    //        $scope.is_login_clicked = false;
    //    });
    //};
    //
    //
    ///**************************************/
    //
    //
    ///********       REGISTERING        ********/
    //
    //function initRegister() {
    //    clearFormRegister();
    //}
    //
    //function clearFormRegister() {
    //    $scope.user = {
    //        "login": "",
    //        "password": "",
    //        "name": "",
    //        "surname": "",
    //        "retypedPassword": ""
    //    };
    //}
    //
    //
    //$scope.register = function () {
    //    $scope.is_register_clicked = true;
    //    $scope.feedback = "";
    //
    //
    //    userService.register($scope.user).then(function (message) {
    //        $scope.feedback = "Pomyślnie zarejestrowano użytkownika!";
    //
    //        $scope.userLogin = {
    //            "login": $scope.user.login,
    //            "password": $scope.user.password
    //        };
    //        $scope.loguj();
    //
    //        clearFormRegister();
    //    }, function (err) {
    //        /*if(userService.getUser({"login": $scope.user.login, "password": $scope.user.password}) != null){
    //         $scope.feedback = "Użytkownik o takiej nazwie istnieje!"
    //         }else*/
    //        $scope.feedback = "Wystąpił błąd podczas rejestracji!"
    //        clearFormRegister();
    //        $scope.is_register_clicked = false;
    //    }, function (update) {
    //        $scope.is_register_clicked = false;
    //    });
    //};
    //
    //initRegister();
    //
    //
    ///******************************************/

}
