/**
 * Created by Dammic on 14.03.16.
 */

 
function queryTable() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/queryTable/queryTable.html',
        controller: QueryTableController,
        controllerAs: "queryTableCtrl"
    };
}

class QueryTableController {
    constructor() {
        let self = this;
		
		self.events = [];
		self.totalResults = 0;
		self.totalPages = 1;
		self.limit = 4;
	}
	
	paginate(page, limit){
		let self = this;
		console.log("Page: "+page+ " limit: "+limit);
	}
	
	search(city, region, category, from, to){
        let self = this;
		console.log("City: "+city+ " region: "+region+" category: "+category+ " from: "+from+ " to: "+to);
		self.totalResults = 4;
		self.totalPages = Math.ceil(self.totalResults / self.limit);
		self.events = [
			{	
				avatar: "gallery/default.gif",
				name: "Buziaczek22",
				city: "Jarosław",
				region: "Podkarpackie",
				category: "Piłka nożna",
				date: "16.11.2008",
				description: "Szukamy ludzi do gry w piłkę..."
			},
			{	
				avatar: "gallery/default.gif",
				name: "Mechanix",
				city: "Rzeszów",
				region: "Podkarpackie",
				category: "Siatkówka",
				date: "18.11.2008",
				description: "Witam, jestem studentem pr..."
			},
			{	
				avatar: "gallery/default.gif",
				name: "KochamOgorki",
				city: "Kraków",
				region: "Małopolskie",
				category: "Inne",
				date: "11.11.2008",
				description: "4 osoby, 40 zł, własny sprzę..."
			},
			{
				avatar: "gallery/default.gif",
				name: "ElDammicos",
				city: "Kraków",
				region: "Małopolskie",
				category: "Siatkówka",
				date: "11.11.2666",
				description: "Chciałbym powiedzieć, że je..."
			}
		];
		
		
	}
	

}
		
export default queryTable;