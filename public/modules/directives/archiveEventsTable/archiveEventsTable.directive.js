/**
 * Created by Dammic on 14.03.16.
 */

 
function archiveEventsTable() {
    return {
        restrict: 'E',
        templateUrl: 'modules/directives/archiveEventsTable/archiveEventsTable.html',
        controller: ArchiveEventsTableController,
        controllerAs: "archiveEventsTableCtrl"
    };
}

class ArchiveEventsTableController {
    constructor($scope) {
        let self = this;
		self.$scope = $scope;
		self.events = [];
		
		$scope.totalResults = 0;
		$scope.totalPages = 1;
		$scope.limit = 4;
		
		self.getEvents();
	}
	
	rowClicked(id){
		console.log("clicked item with id " + id + "!");
		//now you can redirect to event/{{id}}
		
	}
	
	paginate(page, limit){
		let self = this;
		console.log("Page: "+page+ " limit: "+limit);
	}
	
	getEvents(){
        let self = this;
		
		//We add "0" at the beginning, so "1" becomes "01" and "12" becomes "012", then we take the last 2 digits so that we get a number with length 2 //
		//let fromStr = (( "0" + from.getDate()).slice(-2)) + "." + (( "0" + (from.getMonth()+1)).slice(-2)) + "." + from.getFullYear();
		//let toStr = (( "0" + to.getDate()).slice(-2)) + "." + (( "0" + (to.getMonth()+1)).slice(-2)) + "." + to.getFullYear();
		//console.log("City: "+city+ " region: "+region+" category: "+category+ " from: "+fromStr+ " to: "+toStr);
		
		
		
		self.$scope.totalResults = 4;
		self.$scope.totalPages = Math.ceil(self.$scope.totalResults / self.$scope.limit);
		console.log("total pages: "+self.$scope.totalPages);
		self.events = [
			{	
				id: "222",
				city: "Jarosław",
				category: "Piłka nożna",
				date: "16.11.2008",
				participants: 3,
				limit: 10
			},
			{	
				id: "223",
				city: "Rzeszów",
				category: "Siatkówka",
				date: "18.11.2008",
				participants: 2,
				limit: 10
			},
			{	
				id: "224",
				city: "Kraków",
				category: "Inne",
				date: "11.11.2008",
				participants: 5,
				limit: 10
			},
			{
				id: "225",
				city: "Kraków",
				category: "Siatkówka",
				date: "11.11.2666",
				participants: 10,
				limit: 10
			}
		];
		
		
	}
	

}
		
export default archiveEventsTable;