/**
 * Created by piec on 13.03.16.
 */


function prefooter2() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/prefooter2/prefooter2.html',
        controller: Prefooter2Controller,
        controllerAs: "prefooter2Ctrl"
    };
}

class Prefooter2Controller {
    constructor() {
        let self = this;
    }
}

export default prefooter2;