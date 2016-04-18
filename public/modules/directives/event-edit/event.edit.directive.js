/**
 * Created by piec on 4/18/2016.
 */
/**
 * Created by piec on 4/18/2016.
 */
import User from 'Classes/User';

function EventEdit() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/event-edit/event_edit.html',
        controller: EventEditController,
        controllerAs: "event_editCtrl"
    };
}

class EventEditController {
    constructor($log, localStorageService, UserService, $scope, $state, EventService) {
        let self = this;
        self.localStorageService = localStorageService;
        self.UserService = UserService;
        self.$l = $log;
        self.$scope = $scope;
        self.$state = $state;
    }
}

export default EventEdit;