/**
 * Created by danielslaby on 20/03/16.
 */
function main(UserService, loader, $state, $rootScope, localStorageService, $http, $window, GoogleService) {
    "use strict";
    let token = UserService.token;

    $http({
        method: 'JSONP',
        url: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCdp3QzFm-6Xp1qULwW4JPMJiYX0lydf-o&callback=initMap&libraries=places"
    });
    $window.initMap = function () {
        GoogleService.ready = true;
    };

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
                $state.go('login');
            }
        );
    }

    $rootScope.$on('$stateChangeSuccess', (event, toState, fromState, fromParams, options)=> {
        if (toState.name !== "login") {
            console.log("STATE", toState.name);
            localStorageService.set('lastPage', toState.name);
        }
    });


}
export default main;