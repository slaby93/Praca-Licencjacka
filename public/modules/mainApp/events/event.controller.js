/**
 * Created by piec on 4/8/2016.
 */
class EventController {

    constructor($scope, $log, $stateParams) {
        let self = this;
        self.$scope = $scope;
        self.$l = $log;
        $log.debug("Params", $stateParams);
        self.defaultValues();
    }

    defaultValues() {
        let self = this;
        self.state = "add";
    }

    test() {
        let self = this;
        if (self.state === "add") {
            self.state = "edit";
        } else {
            // $('.switchToEdit').css('transform', 'rotateY(90deg)');
            // self.$scope.$evalAsync(()=> {
                self.state = "add";
            // },100);
        }

    }
}

export default EventController;
