/**
 * Created by piec on 4/8/2016.
 */
class EventController {

    constructor($scope, $log, $state, UserService, $stateParams) {
        let self = this;
        self.$scope = $scope;
        self.$l = $log;
        self.$state = $state;
        self.UserService = UserService;
        self.$stateParams = $stateParams;
        self.defaultValues();
    }

    defaultValues() {
        let self = this;
        if (self.$stateParams.action) {
            self.state = self.$stateParams.action;
        } else {
            self.state = "add";
        }
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
