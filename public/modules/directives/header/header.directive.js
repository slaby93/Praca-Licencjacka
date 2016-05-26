/**
 * Created by piec on 13.03.16.
 */
import User from 'Classes/User';
import SportEvent from 'Classes/SportEvent';

function header() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/header/header.html',
        controller: HeaderController,
        controllerAs: "headerCtrl"
    };
}

class HeaderController {
    constructor($log, localStorageService, UserService, $scope, $state, EventService, moment) {
        let self = this;
        self.localStorageService = localStorageService;
        self.UserService = UserService;
        self.$l = $log;
        self.$scope = $scope;
        self.$state = $state;
        self.EventService = EventService;
        self.setDefaultValues();
        self.setWatchers();
    }

    setWatchers() {
        let self = this;
        self.userWatch = self.$scope.$watch('headerCtrl.UserService.user', (newUser)=> {
            self.user = newUser;
            self.messageCount = 0;
            self.userImage = self.UserService.user.id;
        }, true);
    }

    goToProfile(index, userName) {
        let self = this;
        self.$state.go("app.account", {userName: userName, indexName: index});
    }

    goToHome() {
        let self = this;
        self.$state.go("app.home");
    }


    setDefaultValues() {
        let self = this;
        self.options = [
            {
                placeholder: "Jak to działa?",
                click: () => {

                },
                visibility: ["guest", "user"]
            },
            {
                placeholder: "Dodaj wydarzenie",
                click: () => {
                    self.$state.go("app.event.add");
                },
                visibility: ["user"]
            },
            {
                placeholder: "Szukaj wydarzeń",
                click: () => {
                    self.$state.go("center");
                },
                visibility: ["user"]
            },
            {
                placeholder: "Ustawienia konta",
                click: () => {
                    self.goToProfile('settings', self.UserService.user.login);
                },
                visibility: ["user"]
            },
            {
                placeholder: "CMS",
                click: () => {
                    showUploadModal()
                },
                visibility: ["admin"]
            },
            {
                placeholder: "TEST-addEvent (fixed)",
                click: () => {
                    //IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
                    self.EventService.addEvent(new SportEvent(self.UserService.user.id, new Date(2016, 3, 17, 0, 0), new Date(2017, 3, 19, 0, 0), "resources/icons/bell.svg", "To wydarzenie bedzie wspaniale!", "siatkówka", 30, false, 0, 30, "A", true, 50.283197, 18.674011, []));
                },
                visibility: ["user"]
            },
            {
                placeholder: "TEST-checkForEventsToDeactivate (fixed)",
                click: () => {
                    //IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
                    self.EventService.checkForEventsToDeactivate();
                },
                visibility: ["user"]
            },
            {
                placeholder: "TEST-cleanOld (fixed)",
                click: () => {
                    //IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
                    self.EventService.cleanOld();
                },
                visibility: ["user"]
            },
            {
                placeholder: "TEST-remove (fixed)",
                click: () => {
                    //IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
                    self.EventService.remove("573e3e244ab2eb88102552a6", "571ca790e033b8ab254a680e");
                },
                visibility: ["user"]
            },
            {
                placeholder: "TEST-findByUser (fixed)",
                click: () => {
                    //IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
                    self.EventService.findByUser("571ca790e033b8ab254a680e");
                },
                visibility: ["user"]
            },
            {
                placeholder: "TEST-sendMessage (fixed)",
                click: () => {
                    //IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
                    self.UserService.sendMessage("571ca790e033b8ab254a680e", "taka jest tresc tej wiadomosci", new Date(), "taki jest tytul tej wiadomosci", ["5738884dc232ec04156700fa", "5721dbc0e5b6270019f3ecab", "57387a63036adc9406dd49b7"]);
                },
                visibility: ["user"]
            },
            {
                placeholder: "TEST-removeMessage (fixed)",
                click: () => {
                    //IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
                    self.UserService.removeMessage("5744a2d01ad8bad41a7ea17d");
                },
                visibility: ["user"]
            },
            {
                placeholder: "TEST-sendMessageFromSystem (fixed - toAll)",
                click: () => {
                    //IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
                    let toAll = true;
                    self.UserService.sendMessageFromSystem("taka jest tresc tej wiadomosci", new Date(), "taki jest tytul tej wiadomosci", ["5738884dc232ec04156700fa", "5721dbc0e5b6270019f3ecab", "57387a63036adc9406dd49b7"], toAll);
                },
                visibility: ["user"]
            },
            {
                placeholder: "TEST-sendMessageFromSystem (fixed - !toAll)",
                click: () => {
                    //IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
                    let toAll = false;
                    self.UserService.sendMessageFromSystem("taka jest tresc tej wiadomosci", new Date(), "taki jest tytul tej wiadomosci", ["5738884dc232ec04156700fa", "5721dbc0e5b6270019f3ecab", "57387a63036adc9406dd49b7"], toAll);
                },
                visibility: ["user"]
            },
            {
                placeholder: "TEST-sendSystemMessage (fixed - toAll)",
                click: () => {
                    //IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
                    //IT SHOULD NOT WORK FROM HERE AS THE METHOD IS PRIVATE!!!!
                    let toAll = false;
                    self.UserService.sendSystemMessage("taka jest tresc tej wiadomosci", new Date(), "taki jest tytul tej wiadomosci", ["5738884dc232ec04156700fa", "5721dbc0e5b6270019f3ecab", "57387a63036adc9406dd49b7"], toAll);
                },
                visibility: ["user"]
            },
            {
                placeholder: "Wyloguj",
                click: () => {
                    let self = this;
                    self.UserService.logout();
                },
                visibility: ["user"]
            }
        ];
    }


}

export default header;