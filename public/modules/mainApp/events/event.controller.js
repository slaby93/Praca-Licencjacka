/**
 * Created by piec on 4/8/2016.
 */

import SportEvent from 'Classes/SportEvent';

/**
 * When we enter this controller, it checks if:
 * -the query element eventId from  event/:eventID/ is ObjectID type,
 * -the id exists
 * if one of those conditions is not meet, it redirects the user to introduction state
 * This controller also contains eventInfo object with the data of the event of this ID
 */


class EventController {

    constructor($scope, $log, $state, UserService, EventService, $stateParams, $window, loader) {
        let self = this;
        self.$scope = $scope;
        self.$l = $log;
        self.$state = $state;
        self.UserService = UserService;
        self.EventService = EventService;
        self.$stateParams = $stateParams;
        self.notie = $window.notie;
        self.loader = loader;
        self.defaultValues();
        self.setScopeListeners();
    }

    setScopeListeners(){
        let self = this;
        self.$scope.$on('event:joined', function(event,data) {
            self.loader.show();
            self.EventService.joinEvent(self.eventInfo._id, self.eventInfo.author, self.UserService.user.id).then((resp) => {
                if(resp == "ok") {
                    self.eventInfo.participants.unshift({'_id': self.UserService.user.id});
                    self.$scope.$broadcast('event:filled', self.eventInfo);
                    self.notie.alert(1, 'Pomyślnie dołączono do eventu!');
                }else  self.notie.alert(2, 'Nie można dołączyć do eventu!');
                self.loader.hide();
            });
        });
        self.$scope.$on('event:left', function(event,data){
            self.loader.show();
            self.EventService.kickUser(self.eventInfo._id, self.UserService.user.id).then((resp) => {
                if(resp == "ok"){
                    _.remove(self.eventInfo.participants, (value) => {
                        return value._id == self.UserService.user.id;
                    });
                    self.$scope.$broadcast('event:filled',self.eventInfo);
                    self.notie.alert(1, 'Pomyślnie opuszczono wydarzenie!');
                }else  self.notie.alert(2, 'Nie można opuścić wydarzenia!');
                self.loader.hide();
            });
        });
        self.$scope.$on('event:left', function(event,data){
            self.loader.show();
            self.EventService.kickUser(self.eventInfo._id, self.UserService.user.id).then((resp) => {
                if(resp == "ok"){
                    _.remove(self.eventInfo.participants, (value) => {
                        return value._id == self.UserService.user.id;
                    });
                    self.$scope.$broadcast('event:filled',self.eventInfo);
                    self.notie.alert(1, 'Pomyślnie opuszczono wydarzenie!');
                }else  self.notie.alert(2, 'Nie można opuścić wydarzenia!');
                self.loader.hide();
            });
        });
        self.$scope.$on('event:kick', function(event,data){
            self.loader.show();
            self.EventService.kickUser(self.eventInfo._id, data.userID).then((resp) => {
                if(resp == "ok"){
                    _.remove(self.eventInfo.participants, (value) => {
                        return value._id == data.userID;
                    });
                    self.$scope.$broadcast('event:filled',self.eventInfo);
                    self.notie.alert(1, 'Pomyślnie wyrzucono użytkownika z wydarzenia!');
                }else  self.notie.alert(2, 'Nie można wyrzucić użytkownika z wydarzenia!');
                self.loader.hide();
            });
        });
        self.$scope.$on('event:refresh', function(event,data){
            self.getDataFromServer();
        });
        self.$scope.$on('event:edited', function(event,data){
            self.loader.show();
            self.EventService.update(new SportEvent(self.eventInfo.author, self.eventInfo.createdDate, self.eventInfo.date,
                                                    data.data.eventIcon, data.data.eventInfo.description, self.eventInfo.eventInfo.category,
                                                    data.data.eventInfo.payment, data.data.eventInfo.ownEquipment, data.data.eventInfo.experience,
                                                    data.data.eventInfo.usersLimit, data.data.eventInfo.title, self.eventInfo.isActive,
                                                    self.eventInfo.localization.latitude, self.eventInfo.localization.longitude,
                                                    self.eventInfo.participants), data.data._id)
            .then((resp) => {
                if(resp == "ok"){

                    self.eventInfo.eventIcon = data.data.eventIcon;
                    self.eventInfo.eventInfo.description = data.data.eventInfo.description;
                    self.eventInfo.eventInfo.payment = data.data.eventInfo.payment;
                    self.eventInfo.eventInfo.ownEquipment = data.data.eventInfo.ownEquipment;
                    self.eventInfo.eventInfo.experience = data.data.eventInfo.experience;
                    self.eventInfo.eventInfo.usersLimit = data.data.eventInfo.usersLimit;
                    self.eventInfo.eventInfo.title = data.data.eventInfo.title;


                    self.$scope.$broadcast('event:updateSuccess');
                    self.$scope.$broadcast('event:filled',self.eventInfo);
                    self.notie.alert(1, 'Pomyślnie zaaktualizowano wydarzenie!');
                }else if(resp =="nochange")  self.notie.alert(2, 'Błąd podczas aktualizacji wydarzenia - jest ono prawdopodobnie nieaktywne bądź nie było zmian');
                 else  self.notie.alert(2, 'Błąd podczas aktualizacji wydarzenia!');
                self.loader.hide();
            });
        });

    }

    getDataFromServer(){
        let self = this;
        self.loader.show();
        self.EventService.findById(self.eventID).then((resp)=> {
            if (!resp) {
                alert("ERROR");
                return;
            }
            //in case we don't find an event in the database
            //(the _id is not present), we should redirect the user to to the error site or wherever else

            if(resp.data.docs[0] === undefined)  {self.$state.go("introduction");  return;}
            self.eventInfo = resp.data.docs[0];
            self.$scope.$broadcast('event:filled',resp.data.docs[0]);
            self.loader.hide();
        });
    }

    defaultValues() {

        let self = this;
        self.eventInfo = {};
        self.eventID = self.$stateParams.eventID;

        // Checking, if the passed string is an ObjectID and can be passes as _id argument to db.find
        // in case it does not match, we send user to introduction state
        if (!self.eventID.match(/^[0-9a-fA-F]{24}$/))  {self.$state.go("introduction");  return;}
        self.getDataFromServer();

    }
}

export default EventController;
