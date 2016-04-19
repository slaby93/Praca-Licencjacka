/**
 * Created by piec on 4/8/2016.
 */
function EventSearchEdit() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/event-search/event_search.html',
        controller: EventSearchController,
        controllerAs: "event_searchCtrl"
    };
}

class EventSearchController {
    constructor($log, localStorageService, UserService, $scope, $state, EventService) {
        let self = this;
        self.localStorageService = localStorageService;
        self.UserService = UserService;
        self.$l = $log;
        self.$scope = $scope;
        self.$state = $state;
    }
}

export default EventSearchEdit;