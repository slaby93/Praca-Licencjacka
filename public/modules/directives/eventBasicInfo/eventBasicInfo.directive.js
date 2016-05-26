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
    constructor(UserService, EventService, $scope, $state, $rootScope, $log, loader, $window) {
        let self = this;
        self.UserService = UserService;
        self.EventService = EventService;
        self.$scope = $scope;
        self.$state = $state;
        self.$rootScope = $rootScope;
        self.$l = $log;
        self.loader = loader;
        self.$window = $window;
        self.notie = $window.notie;
        self.watchEventInfo();
        self.setDefaultValues();
    }

    setDefaultValues() {
        let self = this;
        self.editMode = false;
        self.eventInfo = {"eventInfo": {}, "participants": []};
        self.isActive = '';
        self.eventDate = '';
        self.eventCreatedDate = '';
        self.setTopScopeListeners();
        self.setBottomScopeListeners();
    }


    setTopScopeListeners() {
        let self = this;
        self.$scope.$on('event:filled', function (event, data) {
            self.eventInfo = data;
            self.isActive = (new Date(self.eventInfo.date)) > (new Date());
            self.eventDate = self.buildDateString(new Date(self.eventInfo.date));
            self.eventCreatedDate = self.buildDateString(new Date(self.eventInfo.createdDate));
        });
        self.$scope.$on('event:updateSuccess', function (event, data) {
           self.eventInfoEdit = undefined;
           self.editMode = false;
            $('#experienceRating').rating('disable').rating({initialRating: self.eventInfo.eventInfo.experience});
        });
    }

    setBottomScopeListeners() {
        let self = this;
        self.$scope.$on('iconModal:hide', function (event, data) {
            self.eventInfoEdit.eventIcon = data.iconUrl;
            self.$scope.$evalAsync();
        });
    }

    watchEventInfo() {
        let self = this;
        self.$scope.$watch(()=> {
            return self.eventInfo;
        }, (newValue)=> {
            $('#experienceRating')
                .rating({
                    initialRating: self.eventInfo.eventInfo.experience,
                    maxRating: 5
                }).rating('setting', 'onRate', (value) => {
                    self.eventInfoEdit.eventInfo.experience = value;
                }).rating('disable');
        }, true);
        self.$scope.$watch(()=> {
            return self.eventInfoEdit;
        }, (newValue)=> {

        }, true);
    }

    showIconChoiceModal(){
        let self = this;
        self.$scope.$broadcast('iconModal:show', self.eventInfoEdit.eventIcon);
    }

    checkUserAlreadyRegistered(userID) {
        let self = this;
        return (_.find(self.eventInfo.participants, {'_id': userID}) != undefined);
    }

    checkRights() {
        let self = this;
        return self.UserService.hasRight(['user', 'admin']);
    }

    getProperButton() {
        let self = this;
        let out = '';
        //if the user is not an author of this event
        if (!(self.eventInfo.author == self.UserService.user.login)) {
            //if the user is not on the participants list
            if (!self.checkUserAlreadyRegistered(self.UserService.user.id)) {
                //if there are still slots - we should display the 'join' button
                if (self.isJoin())  out = 'join';
                //if there are no free slots - we should display the 'is already full' button
                else  out = 'disabled';
                //if the user is on the participants list - we should display the 'leave' button
            } else  out = 'leave';
            //if the user is an author of this event - we should display the 'already registered' button
        } else  out = 'already';

        return out;
    }

    refresh() {
        let self = this;
        if (!self.editMode)  self.$scope.$emit("event:refresh", {});
    }

    isOwnPage() {
        let self = this;
        return self.EventService.isOwnPage(self.eventInfo.author);
    }

    enterEditMode() {
        let self = this;
        if (self.isOwnPage()) {
            self.eventInfoEdit = {
                "_id": self.eventInfo._id,
                "eventIcon": self.eventInfo.eventIcon,
                "eventInfo": {
                    "description": self.eventInfo.eventInfo.description,
                    "payment": self.eventInfo.eventInfo.payment,
                    "ownEquipment": self.eventInfo.eventInfo.ownEquipment,
                    "experience": self.eventInfo.eventInfo.experience,
                    "usersLimit": self.eventInfo.eventInfo.usersLimit,
                    "title": self.eventInfo.eventInfo.title
                }
            };
            $('#experienceRating').rating('enable');
            self.editMode = true;
        }
    }

    closeEditMode(saved) {
        let self = this;
        if (self.isOwnPage()) {
            if (saved) {
                if(self.eventInfoEdit.eventInfo.title.length < 10 || self.eventInfoEdit.eventInfo.title.length > 30)  self.notie.alert(2, 'Tytuł musi posiadać conajmniej 10 i conajwyżej 30 znaków!');
                else if(self.eventInfoEdit.eventInfo.payment < 0)  self.notie.alert(2, 'Nieprawidłowa wartość składki!');
                else if(self.eventInfoEdit.eventInfo.usersLimit < self.eventInfo.eventInfo.usersLimit)  self.notie.alert(2, 'Limitu użytkowników nie można zmniejszać!');
                else  self.$scope.$emit("event:edited", {"data": self.eventInfoEdit});
            }else{
                self.eventInfoEdit = undefined;
                self.editMode = false;
            }
        }
    }

    joinEvent() {
        let self = this;
        self.$scope.$emit("event:joined", {});
    }

    showEndConfirm(){
        let self = this;
        if(self.isOwnPage()) {
            self.notie.confirm('Czy na pewno chcesz zakończyć wydarzenie?<br><br>Ta operacja jest nieodwracalna!', 'Tak', 'Anuluj', () => {
                self.$scope.$emit("event:closed",{});
                self.editMode = false;
            });
        }
    }

    leaveEvent(id) {
        let self = this;
        self.$scope.$emit("event:left", {"userID": id});
    }

    buildDateString(date) {
        return (( "0" + date.getHours()).slice(-2)) + ':' + (( "0" + date.getMinutes()).slice(-2)) + ' ' + (( "0" + date.getDate()).slice(-2)) + '.' + (( "0" + (date.getMonth() + 1)).slice(-2)) + '.' + date.getFullYear();
    }

    getCategory() {
        let self = this;
        return self.eventInfo.eventInfo.category;
    }

    getPayment() {
        let self = this;
        return (self.eventInfo.eventInfo.payment == 0 ? "Bezpłatny" : self.eventInfo.eventInfo.payment);
    }

    getOwnEquipment() {
        let self = this;
        return (self.eventInfo.eventInfo.ownEquipment ? "Tak" : "Nie");
    }

    getExperience() {
        let self = this;
            if(self.eventInfoEdit == undefined)  return self.eventInfo.eventInfo.experience;
            return  self.eventInfoEdit.eventInfo.experience
    }

    isJoin() {
        let self = this;
        return (self.eventInfo.participants.length < self.eventInfo.eventInfo.usersLimit);
    }

    getParticipantsCount() {
        let self = this;
        return self.eventInfo.participants.length + "/" + self.eventInfo.eventInfo.usersLimit;
    }


    goToUserProfile() {
        let self = this;
        self.$state.go("app.account", {userName: self.eventInfo.author, indexName: 'profile'});
    }

}

export default eventBasicInfo;