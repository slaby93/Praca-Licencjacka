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
                    self.$state.go("create");
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
                visibility: []
            },
            {
                placeholder: "TEST-checkForEventsToDeactivate (fixed)",
                click: () => {
                    //IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
                    self.EventService.checkForEventsToDeactivate();
                },
                visibility: []
            },
            {
                placeholder: "TEST-cleanOld (fixed)",
                click: () => {
                    //IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
                    self.EventService.cleanOld();
                },
                visibility: []
            },
            {
                placeholder: "TEST-remove (fixed)",
                click: () => {
                    //IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
                    self.EventService.remove("573e3e244ab2eb88102552a6", "571ca790e033b8ab254a680e");
                },
                visibility: []
            },
            {
                placeholder: "TEST-findByUser ACTIVE (fixed)",
                click: () => {
                    //IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
                    self.EventService.findByUser("57495df69895519519f6d4a3",true);
                },
                visibility: []
            },
            {
                placeholder: "TEST-setCommented (false) (fixed)",
                click: () => {
                    //IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
                    self.EventService.setCommented("572f0c19c40ef768253e98fd","5749b90ee008dd0c173d458f", false);
                },
                visibility: []
            },

            {
                placeholder: "TEST-findByIdWhereUserParticipated (fixed)",
                click: () => {
                    //IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
                    self.EventService.findByIdWhereUserParticipated("5749b90ee008dd0c173d458f");
                },
                visibility: []
            },
            {
                placeholder: "TEST-setCommented (true) (fixed)",
                click: () => {
                    //IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
                    self.EventService.setCommented("572f0c19c40ef768253e98fd","5749b90ee008dd0c173d458f", true);
                },
                visibility: []
            },
            {
                placeholder: "TEST-isOnBlacklist (fixed)",
                click: () => {
                    //IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
                    self.UserService.isOnBlacklist("5749b90ee008dd0c173d458f" ,"57495df69895519519f6d4a3").catch((err) =>{
                        self.$l.debug(err);
                    });
                },
                visibility: []
            },
            {
                placeholder: "TEST-addUserToBlacklist (fixed)",
                click: () => {
                    //IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
                    self.UserService.addUserToBlacklist("5749b90ee008dd0c173d458f").catch((err) =>{
                        self.$l.debug(err);


                    });
                },
                visibility: []
            },
            {
                placeholder: "TEST-findByUser INACTIVE (fixed)",
                click: () => {
                    //IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
                    self.EventService.findByUser("57495df69895519519f6d4a3", false);
                },
                visibility: []
            },
            {
                placeholder: "TEST-sendMessage (fixed)",
                click: () => {
                    //IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
                    self.UserService.sendMessage("571ca790e033b8ab254a680e", "taka jest tresc tej wiadomosci", new Date(), "taki jest tytul tej wiadomosci", ["5738884dc232ec04156700fa", "5721dbc0e5b6270019f3ecab", "57387a63036adc9406dd49b7"]);
                },
                visibility: []
            },
            {
                placeholder: "TEST-removeMessage (fixed)",
                click: () => {
                    //IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
                    self.UserService.removeMessage("5744a2d01ad8bad41a7ea17d");
                },
                visibility: []
            },
            {
                placeholder: "TEST-findUserInfoById (isFull = false)",
                click: () => {
                    //IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
                    self.UserService.findUserInfoById("slaby", false);
                },
                visibility: []
            },
            {
                placeholder: "TEST-findUserInfoById (isFull = true)",
                click: () => {
                    //IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
                    self.UserService.findUserInfoById("slaby", true);
                },
                visibility: []
            },
            {
                placeholder: "TEST-banUser(fixed)",
                click: () => {
                    //IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
                    self.UserService.banUser("5749b90ee008dd0c173d458f", 7);
                },
                visibility: []
            },
            {
                placeholder: "TEST-unbanUser(fixed)",
                click: () => {
                    //IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
                    self.UserService.unbanUser("5749b90ee008dd0c173d458f");
                },
                visibility: []
            },
            {
                placeholder: "TEST-sendMessageFromSystem (fixed - toAll)",
                click: () => {
                    //IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
                    let toAll = true;
                    self.UserService.sendMessageFromSystem("taka jest tresc tej wiadomosci", new Date(), "taki jest tytul tej wiadomosci", ["5738884dc232ec04156700fa", "5721dbc0e5b6270019f3ecab", "57387a63036adc9406dd49b7"], toAll);
                },
                visibility: []
            },
            {
                placeholder: "TEST-sendMessageFromSystem (fixed - !toAll)",
                click: () => {
                    //IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
                    let toAll = false;
                    self.UserService.sendMessageFromSystem("taka jest tresc tej wiadomosci", new Date(), "taki jest tytul tej wiadomosci", ["5738884dc232ec04156700fa", "5721dbc0e5b6270019f3ecab", "57387a63036adc9406dd49b7"], toAll);
                },
                visibility: []
            },
            {
                placeholder: "TEST-sendSystemMessage (fixed - toAll)",
                click: () => {
                    //IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
                    //IT SHOULD NOT WORK FROM HERE AS THE METHOD IS PRIVATE!!!!
                    let toAll = true;
                    self.UserService._sendSystemMessage("taka jest tresc tej wiadomosci", new Date(), "taki jest tytul tej wiadomosci", ["5738884dc232ec04156700fa", "5721dbc0e5b6270019f3ecab", "57387a63036adc9406dd49b7"], toAll);
                },
                visibility: []
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