/**
 * Created by piec on 4/8/2016.
 */
class EventController {

    constructor($scope, $log, $state, UserService, EventService, $stateParams) {
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

    }


}

export default EventController;
