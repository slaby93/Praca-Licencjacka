/**
 * Created by piec on 13.03.16.
 */


function prefooter() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/prefooter/prefooter.html',
        controller: PrefooterController,
        controllerAs: "prefooterCtrl"
    };
}

class PrefooterController {
    constructor() {
        let self = this;
    }
}

export default prefooter;