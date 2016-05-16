/**
 * Created by piec on 13.03.16.
 */


function sportIcons() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/sportIcons/sportIcons.html',
        scope: {
            "sport": "=",
            "sportSolid": "@",
        },
        controller: SportIconsController,
        controllerAs: "sportIconsCtrl",
        bindToController: true
    };
}

class SportIconsController {
    constructor() {
        let self = this;
    }
}

export default sportIcons;