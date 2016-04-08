/**
 * Created by piec on 4/8/2016.
 */
class EventController {

    constructor($scope, $log,$stateParams) {
        let self = this;
        self.$scope = $scope;
        self.$l = $log;
        $log.debug("Params",$stateParams);
    }
}

export default EventController;
