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
				avatar: "gallery/default.jpg",
				name: "Buziaczek22",
				city: "Jarosław",
				region: "Podkarpackie",
				category: "Piłka nożna",
				date: "16.11.2008",
				description: "Szukamy ludzi do gry w piłkę..."
			},
			{	
				avatar: "gallery/default.jpg",
				name: "Mechanix",
				city: "Rzeszów",
				region: "Podkarpackie",
				category: "Siatkówka",
				date: "18.11.2008",
				description: "Witam, jestem studentem pr..."
			},
			{	
				avatar: "gallery/default.jpg",
				name: "KochamOgorki",
				city: "Kraków",
				region: "Małopolskie",
				category: "Inne",
				date: "11.11.2008",
				description: "4 osoby, 40 zł, własny sprzę..."
			},
			{
				avatar: "gallery/default.jpg",
				name: "ElDammicos",
				city: "Kraków",
				region: "Małopolskie",
				category: "Siatkówka",
				date: "11.11.2666",
				description: "Chciałbym powiedzieć, że je..."
			}
		];
	}

	rowClicked(id){
		console.log("clicked item with id " + id + "!");
		//now you can redirect to event/{{id}}
		
	}
	
	
}
export default latestEventsTable;