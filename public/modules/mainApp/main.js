/**
 * Created by danielslaby on 20/03/16.
 */
function main(UserService, loader, $state, $rootScope, localStorageService) {
    "use strict";
    let token = UserService.token;


    if (token) {
        loader.show();
        UserService.loginByToken(token).then(
            // Success
            ()=> {
                loader.hide();
                if (localStorageService.get('lastPage')) {
                    $state.go(localStorageService.get('lastPage'));
                } else {
                    $state.go('app.home');
                }

            },
            // Error
            ()=> {
                loader.hide;
                $state.go('app.introduction');
            }
        );
    }

    $rootScope.$on('$stateChangeSuccess', (event, toState, fromState, fromParams, options)=> {
        console.log("STATE", toState.name);
        localStorageService.set('lastPage', toState.name);
    });


}
export default main;