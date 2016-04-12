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
        // self.state = "add";
    }

    toAdd() {
        let self = this;
        self.state = "add";
    }

    toEdit() {
        let self = this;
        self.state = "edit";
    }

    toSearch() {
        let self = this;
        self.state = "search";
    }
}

export default EventController;
