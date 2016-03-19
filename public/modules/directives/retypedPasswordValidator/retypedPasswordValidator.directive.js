/**
 * Created by danielslaby on 19/03/16.
 */

function RetypedPasswordValidator() {
    return {
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {

            scope.$watch('loginModalCtrl.userRegister.retypedPassword', (retypedPassword) => {

                let password = scope.loginModalCtrl.userRegister.password;
                if (retypedPassword === password) {
                    scope.loginModalCtrl.registerForm.retypedPassword.$setValidity('notMatchingPassword', true);
                } else {
                    scope.loginModalCtrl.registerForm.retypedPassword.$setValidity('notMatchingPassword', false);
                }
            });
        }
    };
}

export default RetypedPasswordValidator;