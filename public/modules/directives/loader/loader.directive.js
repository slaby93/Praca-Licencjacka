/**
 * Created by danielslaby on 19/03/16.
 */


function LoaderDirective() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/loader/loader.html',
        controller: LoaderController,
        controllerAs: "loaderCtrl"
    };
}

class LoaderController {
    constructor($log) {
        let self = this;
        self.$l = $log;
    }
}

export default LoaderDirective;