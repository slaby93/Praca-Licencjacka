/**
 * Created by danielslaby on 20/03/16.
 */
function main(UserService, loader, $state) {
    "use strict";
    let token = UserService.getToken();
    if (token) {
        loader.show();
        UserService.loginByToken(token).then(
            // Success
            ()=> {
                loader.hide();
                $state.go('app');
            },
            // Error
            ()=> {
                loader.hide;
                $state.go('app');
            }
        );
    }

}
export default main;