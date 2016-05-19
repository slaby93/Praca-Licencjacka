/**
 * Created by Dammic on 14.03.16.
 */

 
function eventBasicInfo() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/eventBasicInfo/eventBasicInfo.html',
        controller: EventBasicInfoController,
        controllerAs: "eventBasicInfoCtrl"
    };
}

class EventBasicInfoController {
    constructor(UserService, EventService, $scope, $state, $rootScope) {
        let self = this;
        self.UserService = UserService;
        self.EventService = EventService;
        self.$scope = $scope;
        self.$state = $state;
        self.$rootScope = $rootScope;
        self.watchEventInfo();
        self.setDefaultValues();
	}


    setDefaultValues(){
        let self = this;
        self.eventInfo = {"eventInfo" : {}, "participants" :[]};
        self.isActive = false;
        self.eventDate = '';
        self.eventCreatedDate = '';

        self.$scope.$on('event:filled', function(event,data) {
            self.eventInfo = data;
            if( (new Date(self.eventInfo.date)) > (new Date()) )  self.isActive = true;
            self.eventDate = self.buildDateString(new Date(self.eventInfo.date));
            self.eventCreatedDate = self.buildDateString(new Date(self.eventInfo.createdDate));
        });
    }

    watchEventInfo(){
        let self = this;
        self.$scope.$watch(()=> {
            return self.eventInfo;
        }, (newValue)=> {

        }, true);
    }

    joinEvent(){
        let self = this;
        self.$scope.$emit("event:joined",{});
    }

    buildDateString(date){
        return (( "0" + date.getHours()).slice(-2)) + ':'+(( "0" + date.getMinutes()).slice(-2))+' '+(( "0" + date.getDate()).slice(-2))+'.'+(( "0" + (date.getMonth()+1)).slice(-2))+'.'+date.getFullYear();
    }

    getCategory(){
        let self = this;
        return self.eventInfo.eventInfo.category;
    }

    getPayment(){
        let self = this;
        return (self.eventInfo.eventInfo.payment == 0 ? "Bezpłatny" : self.eventInfo.eventInfo.payment);
    }
    getOwnEquipment(){
        let self = this;
        return (self.eventInfo.eventInfo.ownEquipment ? "Tak" : "Nie");
    }
    getExperience(){
        let self = this;
        return self.eventInfo.eventInfo.experience;
    }
    isJoin(){
        let self = this;
        return (self.eventInfo.participants.length < self.eventInfo.eventInfo.usersLimit);
    }
    getParticipantsCount(){
        let self = this;
        return self.eventInfo.participants.length + "/" + self.eventInfo.eventInfo.usersLimit;
    }

    getNumber(num) {
        if(num == 1) return [1];
        if(num == 2) return [1,2];
        if(num == 3) return [1,2,3];
        if(num == 4) return [1,2,3,4];
        if(num == 5) return [1,2,3,4,5];
        return [];
    }

}
		
export default eventBasicInfo;