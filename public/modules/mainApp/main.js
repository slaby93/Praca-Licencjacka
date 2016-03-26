/**
 * Created by danielslaby on 20/03/16.
 */
function main(UserService, loader, $state) {
    "use strict";
    let token = UserService.token;
    if (token) {
        loader.show();
        UserService.loginByToken(token).then(
            // Success
            ()=> { 
                loader.hide();
                $state.go('app.home');
            },
            // Error
            ()=> {
                loader.hide;
                $state.go('app.home');
            }
        );
    }

}
export default main;