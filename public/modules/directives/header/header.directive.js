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
					self.EventService.addEvent(new SportEvent("slaby", new Date(2016, 3, 17, 0, 0), new Date(2016, 3, 19, 0, 0), true, true, "To wydarzenie bedzie wspaniale!", 30, false, true, 30, true, 50.0543231, 50.0543231, []));
                },
                visibility: ["user"]
            },
			{
                placeholder: "TEST-deactivateById (fixed)",
                click: () => {
					//IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
					self.EventService.deactivateById("5728714b6aad6e0a7c000000");
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
                placeholder: "TEST-isActive (fixed)",
                click: () => {
					//IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
					self.EventService.isActive("57278a1c61b11eca7471141e");
                },
                visibility: ["user"]
            },
			{
                placeholder: "TEST-joinEvent (fixed)",
                click: () => {
					//IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
					self.EventService.joinEvent("5728714b6aad6e0a7c0b74f9","danny","onomatopeja");
                },
                visibility: ["user"]
            },
			{
                placeholder: "TEST-kickUser (fixed)",
                click: () => {
					//IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
					self.EventService.kickUser("57278a1c61b11eca7471141e", "onomatopeja");
                },
                visibility: ["user"]
            },
			{
                placeholder: "TEST-remove (fixed)",
                click: () => {
					//IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
					self.EventService.remove("5727b52e61b11eca74711435");
                },
                visibility: ["user"]
            },
			{
                placeholder: "TEST-findByUser (fixed)",
                click: () => {
					//IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
					self.EventService.findByUser("slaby");
                },
                visibility: ["user"]
            },
			{
                placeholder: "TEST-find (fixed)",
                click: () => {
					//IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
					self.EventService.find(50, 20,99999999999999);
                },
                visibility: ["user"]
            },
			{
                placeholder: "TEST-update (fixed)",
                click: () => {
					//IF YOU HAVE ANY FUNCTION YOU WANT TO TEST, FEEL FREE TO PUT IT HERE!
					let sportEvent = new SportEvent("slaby", new Date(2016, 3, 17, 0, 0), new Date(2033, 3, 19, 0, 0), false, false, "hacked!", 666, true, false, 666, false, 11.0543231, 11.0543231, []);
					sportEvent._id = "5727c9f4a6fe57940c8165ab";
					self.EventService.update(sportEvent);
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