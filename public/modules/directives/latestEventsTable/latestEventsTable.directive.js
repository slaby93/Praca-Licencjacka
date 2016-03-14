/**
 * Created by Dammic on 14.03.16.
 */

 
function latestEventsTable() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/latestEventsTable/latestEventsTable.html',
        controller: LatestEventsTableController,
        controllerAs: "latestEventsTableCtrl"
    };
}

class LatestEventsTableController {
    constructor() {
        let self = this;

		self.events = [
			{
				avatar: "gallery/default.gif",
				name: "Agnieszka C.",
				city: "Jarosław",
				region: "Podkarpackie",
				category: "Piłka nożna",
				date: "16.11.2008",
				description: "Szukamy ludzi do gry w piłkę..."
			},
			{	
				avatar: "gallery/default.gif",
				name: "Michał H.",
				city: "Rzeszów",
				region: "Podkarpackie",
				category: "Siatkówka",
				date: "18.11.2008",
				description: "Witam, jestem studentem pr..."
			},
			{
				avatar: "gallery/default.gif",
				name: "Elżbieta H.",
				city: "Kraków",
				region: "Małopolskie",
				category: "Inne",
				date: "11.11.2008",
				description: "4 osoby, 40 zł, własny sprzę..."
			},
			{
				avatar: "gallery/default.gif",
				name: "Damian M.",
				city: "Kraków",
				region: "Małopolskie",
				category: "Siatkówka",
				date: "11.11.2666",
				description: "Chciałbym powiedzieć, że je..."
			}
		];
	}

}
		/*tu bedzie oczywiscie to wczytywane jakos
        self.options = [
			{
                placeholder: "Co jeszcze tu dać?",
                click: () => {
                    
                },
				visibility: "guest"
            },
            {
                placeholder: "Jak to działa?",
                click: () => {
                    //userService.openLoginRegister();
                },
				visibility: "guest"
            },
			{
                placeholder: "Dodaj wydarzenie",
                click: () => {
                    
                },
				visibility: "user"
            },
			{
                placeholder: "Ustawienia konta",
                click: () => {
                    
                },
				visibility: "user"
            },
			{
                placeholder: "CMS",
                click: () => {
                    
                },
				visibility: "admin"
            },
			{
                placeholder: "Wyloguj",
                click: () => {
                    let self = this;
					self.logout();
                },
				visibility: "user"
            }
        ];
		self.initLogin();
	}
	
	logout(){
		let self = this;
		console.log("logout");
        self.UserService.user = null;
        self.UserService.token = null;
		self.UserService.logout();
	}
	
	openLoginRegister(){
		console.log("lol");
		let self = this;
		let modalInstance = $uibModal.open(
			{
				templateUrl: 'modules/mainApp/views/login_registerView.html',
				controller: 'login_registerCtrl',
				backdrop: "static",
				resolve: {
					isLogged: () =>{
						return self.isLogged;
					}
				}
			}
		);
	
		modalInstance.result.then((is) => {
			self.isLogged = is;
		}, () => {
		});
	}
	
	///**
	// * @description Funkcja inicjalizujaca i ew. przekierowujaca do cms, gdy uzytkownik jest juz zalogowany.
	// */
	/*
	initLogin(){
		let self = this;
		self.userLogin = {
			"login": "",
			"password": ""
		};
		let token = self.localStorageService.get("token");
		if (token) {
			userService.loginByToken(token).then(
				// SUCCESS
				(message) => {
					self.$evalAsync(() => {
						self.isLogged = true;
						self.user = userService.getUser();
					});
					/*$state.go("cms");*/
					// ERROR
				/*}, (message) =>{
					console.log(message.data);
					self.isLogged = false;
					// usuwamy niepoprawny token
					self.localStorageService.remove("token");
					// MESSAGE
				}, (message) => {
					self.isLogged = false;
					console.log(message);
				});
		} else {
			self.isLogged = false;
			console.log("Token is empty!");
		}
	}	
}
*/
export default latestEventsTable;