/**
 * Created by piec on 13.03.16.
 */


function footer() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/footer/footer.html',
        controller: FooterController,
        controllerAs: "footerCtrl"
    };
}

class FooterController {
    constructor() {
        let self = this;
    }
}

export default footer;