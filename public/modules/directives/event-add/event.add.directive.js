/**
 * Created by piec on 4/18/2016.
 */
import User from 'Classes/User';

function EventAdd() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/event-add/event_add.html',
        controller: EventAddController,
        controllerAs: "event_addCtrl"
    };
}

class EventAddController {
    constructor($log, localStorageService, UserService, $scope, $state, EventService) {
        let self = this;
        self.localStorageService = localStorageService;
        self.UserService = UserService;
        self.$l = $log;
        self.$scope = $scope;
        self.$state = $state;
    }
}

export default EventAdd;