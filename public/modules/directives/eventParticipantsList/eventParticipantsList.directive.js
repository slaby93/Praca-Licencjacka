/**
 * Created by Dammic on 14.03.16.
 */


function eventParticipantsList() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/eventParticipantsList/eventParticipantsList.html',
        controller: EventParticipantsListController,
        controllerAs: "eventParticipantsListCtrl"
    };
}

class EventParticipantsListController {
    constructor(UserService, EventService, $scope, $state, $rootScope, $log, $stateParams) {
        let self = this;
        
        self.UserService = UserService;
        self.EventService = EventService;
        self.$scope = $scope;
        self.$state = $state;
        self.$rootScope = $rootScope;
        self.$l = $log;
        self.watchParticipants();
        self.setDefaultValues();
    }

    watchParticipants(){
        let self = this;
        self.$scope.$watch(()=> {
            return self.participants;
        }, (newValue)=> {
            self.participants = newValue;
        }, true);
    }
    
    setDefaultValues(){
        let self = this;
        self.number = 3;
        self.participants = [];
        self.$scope.$watch();
        self.setScopeListeners();
    }

    setScopeListeners(){
        let self = this;
        self.$scope.$on('event:filled', function(event,data) {
            self.author = data.author;
            self.participants = data.participants;
            _.forEach(self.participants, (value, key) => {
                self.participants[key].wasClicked = false;
            });
            self.UserService.findBasicUserInfoById(self.participants).then((resp)=> {
                _.merge(self.participants, resp.data.docs);
                self.$scope.$evalAsync();
                self.$l.debug("After merge: ",self.participants);
            });
        });


    }

    showToolTip(participant){
        let self = this;
        _.forEach(self.participants, (value, key) => {
            self.participants[key].wasClicked = false;
        });
        participant.wasClicked = true;
    }

    closeToolTip(participant){
        participant.wasClicked = false;
    }

    isOwnPage() {
        let self = this;
        return self.EventService.isOwnPage(self.author);
    }

    deleteUser(id){
        let self = this;
        if(self.isOwnPage())  self.$scope.$emit("event:kick",{"userID" : id});
    }


    getNumber(num) {
        if(num == 1) return [1];
        if(num == 2) return [1,2];
        if(num == 3) return [1,2,3];
        if(num == 4) return [1,2,3,4];
        if(num == 5) return [1,2,3,4,5];
        return [];
    }

    goToUserPage(user) {
        let self = this;
        self.$state.go(`app.account`, {"userName": user._id, "indexName": "profile"});
    }

}
		
export default eventParticipantsList;