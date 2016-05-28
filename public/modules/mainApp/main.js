/**
 * Created by danielslaby on 20/03/16.
 */
function main(UserService, $timeout, loader, $state, $rootScope, localStorageService, $http, $window, GoogleService) {
    "use strict";
    let token = UserService.token;

    $http({
        method: 'JSONP',
        url: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCdp3QzFm-6Xp1qULwW4JPMJiYX0lydf-o&callback=initMap&libraries=places"
    });
    $window.initMap = function () {
        GoogleService.ready = true;
    };

    let goReady = false;
    $timeout(()=> {
        if (token) {
            loader.show();
            UserService.loginByToken(token).then(
                // Success
                ()=> {
                    loader.hide();
                    if (localStorageService.get('lastPage')) {
                        $state.go(localStorageService.get('lastPage'));
                    } else {
                        $state.go('login');
                    }
                },
                // Error
                ()=> {
                    loader.hide;
                    $state.go('login');
                }
            );
        } else {
            /**
             * User dont have token. Need to login.
             */
            if ($state.current.name !== "login" || $state.current.name !== "register") {
                $state.go("login");
            }
        }
    });
    $rootScope.$on('$stateChangeSuccess', (event, toState, fromState, fromParams, options)=> {
        localStorageService.set('lastPage', toState.name);
    });

    $rootScope.$on('$stateChangeStart', (event, tostate, toParams, fromState, fromParams)=> {
        let token = UserService.token;
        let to = tostate.name;
        if (!token && ['login', 'register'].indexOf(to) === -1) {
            $timeout(()=> {
                $state.go('login');
            });
        }
    });


}
export default main;