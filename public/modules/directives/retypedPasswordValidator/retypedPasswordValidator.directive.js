/**
 * Created by danielslaby on 19/03/16.
 */

function RetypedPasswordValidator() {
    return {
        restrict: 'A',
        link: function (scope, element, attr, ctrl) {
            scope.$watch('loginModalCtrl.userRegister.retypedPassword', (retypedPassword)=> {
                let password = undefined;
                try {
                    password = scope.loginModalCtrl.userRegister.password;
                } catch (e) {

                }


                if (retypedPassword === password && retypedPassword !== undefined && retypedPassword !== '') {
                    scope.loginModalCtrl.registerForm.retypedPassword.$setValidity('notMatchingPassword', true);
                } else {
                    scope.loginModalCtrl.registerForm.retypedPassword.$setValidity('notMatchingPassword', false);
                }
            });
        }
    };
}

export default RetypedPasswordValidator;