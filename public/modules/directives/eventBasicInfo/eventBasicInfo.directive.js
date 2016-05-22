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
    constructor(UserService, EventService, $scope, $state, $rootScope, $log) {
        let self = this;
        self.UserService = UserService;
        self.EventService = EventService;
        self.$scope = $scope;
        self.$state = $state;
        self.$rootScope = $rootScope;
        self.$l = $log;
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
        self.$scope.$on('event:userJoinedResult', function(event,data) {
            if(data.status == "ok"){
                
                
                
            }else{
                
                
            }
        });

    }

    watchEventInfo(){
        let self = this;
        self.$scope.$watch(()=> {
            return self.eventInfo;
        }, (newValue)=> {
        }, true);
    }


    checkUserAlreadyRegistered(userID){
        let self = this;
        return (_.find(self.eventInfo.participants, {'_id' : userID}) != undefined);
    }
    checkRights(){
        let self = this;
        return self.UserService.hasRight(['user', 'admin']);
    }

    getProperButton(){
        let self = this;
        let out = '';
        //if the user is not an author of this event
        if(!(self.eventInfo.author == self.UserService.user.login)) {
            //if the user is not on the participants list
            if (!self.checkUserAlreadyRegistered(self.UserService.user.id)) {
                //if there are still slots - we should display the 'join' button
                if (self.isJoin())  out = 'join';
                //if there are no free slots - we should display the 'is already full' button
                else  out = 'disabled';
            //if the user is on the participants list - we should display the 'leave' button
            }else  out = 'leave';
        //if the user is an author of this event - we should display the 'already registered' button
        }else  out = 'already';

        return out;
    }

    joinEvent(){
        let self = this;
        self.$scope.$emit("event:joined",{});
    }
    leaveEvent(){
        let self = this;
        self.$scope.$emit("event:left",{});
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