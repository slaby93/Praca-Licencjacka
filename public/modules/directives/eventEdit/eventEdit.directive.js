/**
 * Created by danielslaby on 01/05/16.
 */

function eventEdit() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/eventEdit/eventEdit.html',
        controller: EventEditController,
        scope: {
            "editedEvent": "=",
            "centerController": "="
        },
        controllerAs: "editCtr",
        bindToController: true
    };
}

class EventEditController {
    constructor($log,$timeout) {
        let self = this;
        self.$l = $log;
        $timeout(()=>{
            self.$l.debug("ME", self);
        },5000);
    }

}

export default eventEdit;