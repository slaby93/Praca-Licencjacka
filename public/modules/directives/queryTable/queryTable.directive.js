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
	
	rowClicked(id){
		console.log("clicked item with id " + id + "!");
		//now you can redirect to event/{{id}}
		
	}
	
	paginate(page, limit){
		let self = this;
		console.log("Page: "+page+ " limit: "+limit);
	}
	
	search(city, region, category, from, to){
        let self = this;
		
		//We add "0" at the beginning, so "1" becomes "01" and "12" becomes "012", then we take the last 2 digits so that we get a number with length 2 //
		//let fromStr = (( "0" + from.getDate()).slice(-2)) + "." + (( "0" + (from.getMonth()+1)).slice(-2)) + "." + from.getFullYear();
		//let toStr = (( "0" + to.getDate()).slice(-2)) + "." + (( "0" + (to.getMonth()+1)).slice(-2)) + "." + to.getFullYear();
		//console.log("City: "+city+ " region: "+region+" category: "+category+ " from: "+fromStr+ " to: "+toStr);
		
		
		
		self.totalResults = 4;
		self.totalPages = Math.ceil(self.totalResults / self.limit);
		self.events = [
			{	
				id: "222",
				avatar: "gallery/default.jpg",
				name: "Buziaczek22",
				city: "Jarosław",
				region: "Podkarpackie",
				category: "Piłka nożna",
				date: "16.11.2008",
				description: "Szukamy ludzi do gry w piłkę..."
			},
			{	
				id: "223",
				avatar: "gallery/default.jpg",
				name: "Mechanix",
				city: "Rzeszów",
				region: "Podkarpackie",
				category: "Siatkówka",
				date: "18.11.2008",
				description: "Witam, jestem studentem pr..."
			},
			{	
				id: "224",
				avatar: "gallery/default.jpg",
				name: "KochamOgorki",
				city: "Kraków",
				region: "Małopolskie",
				category: "Inne",
				date: "11.11.2008",
				description: "4 osoby, 40 zł, własny sprzę..."
			},
			{
				id: "225",
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
	

}
		
export default queryTable;